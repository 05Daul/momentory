package daul.communityservice.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import daul.communityservice.feignClient.FriendsFeignClient;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import daul.communityservice.dao.PostDao;
import daul.communityservice.dao.PostTagDao;
import daul.communityservice.dao.TagDao;
import daul.communityservice.dto.PostCreationRequestDTO;
import daul.communityservice.entity.PostEntity;
import daul.communityservice.entity.PostTagEntity;
import daul.communityservice.entity.PostTagId;
import daul.communityservice.entity.TagEntity;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

  private final PostTagDao postTagDao;
  private final PostDao postDao;
  private final TagDao tagDao;
  private final FriendsFeignClient friendsFeignClient;
  private final Storage storage;

  @Value("${file.bucket-name}")
  private String bucketName;
  @Value("${file.base-url}")
  private String baseUrl;

  // 게시물 삭제
  @Transactional
  @Override
  public void deletePost(Long postId) {
    PostEntity post = postDao.findById(postId)
        .orElseThrow(() -> new IllegalArgumentException("게시글이 존재하지 않습니다."));

    // 단방향 관계이므로 수동으로 PostTag 먼저 삭제
    postTagDao.deleteByPostId(postId);

    // 게시글 삭제
    postDao.deletePost(postId);
  }

  @Override
  @Transactional
  public PostEntity updatePost(String authenticatedUserSignId, Long postId,
      PostCreationRequestDTO postCreationRequestDTO) {
    PostEntity post = postDao.findById(postId)
        .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 존재하지 않습니다. id=" + postId));

    post.setTitle(postCreationRequestDTO.getTitle());
    post.setContent(postCreationRequestDTO.getContent());
    if (postCreationRequestDTO.getThumbnail() != null) {
      post.setThumbnail(postCreationRequestDTO.getThumbnail());
    }

    List<String> newTags = postCreationRequestDTO.getTags();
    if (newTags != null) {
      postTagDao.deleteByPostId(postId);

      if (!newTags.isEmpty()) {
        addTagsToPost(postId, newTags);
      }
    }
    return postDao.writePost(post);
  }

  @Transactional

  @Override
  public PostEntity readPost(Long postId) {
    return postDao.findById(postId)
        .orElseThrow(() -> new RuntimeException("게시물이 존재하지 않습니다."));
  }

  @Override
  @Transactional(readOnly = true)
  public List<String> getTagNamesByPostId(Long postId) {
    List<PostTagEntity> postTags = postTagDao.findByPostId(postId);

    return postTags.stream()
        .map(postTag -> postTag.getTag().getTagName())
        .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public void addTagToPost(Long postId, String tagName) {
    PostEntity post = postDao.findById(postId)
        .orElseThrow(() -> new IllegalArgumentException("게시글을 찾을 수 없습니다: " + postId));

    // 태그 조회 또는 생성
    TagEntity tag = tagDao.findByTagName(tagName)
        .orElseGet(() -> {
          TagEntity newTag = new TagEntity();
          newTag.setTagName(tagName);
          return tagDao.save(newTag);
        });

    // 이미 연결되어 있는지 확인
    boolean exists = postTagDao.existsByPostIdAndTagId(postId, tag.getTagId());

    if (exists) {
      throw new IllegalStateException("이미 해당 태그가 게시글에 연결되어 있습니다.");
    }

    // PostTag 생성 및 저장
    PostTagId postTagId = new PostTagId(postId, tag.getTagId());
    PostTagEntity postTag = new PostTagEntity();
    postTag.setPostTagId(postTagId);
    postTag.setPost(post);
    postTag.setTag(tag);

    postTagDao.save(postTag);
  }

  @Override
  @Transactional
  public void addTagsToPost(Long postId, List<String> tagNames) {
    if (tagNames == null || tagNames.isEmpty()) {
      return;
    }

    for (String tagName : tagNames) {
      try {
        addTagToPost(postId, tagName);
      } catch (IllegalStateException e) {
        // 이미 존재하는 태그는 건너뛰기
      }
    }
  }

  @Override
  @Transactional
  public void removeTagFromPost(Long postId, String tagName) {
    TagEntity tag = tagDao.findByTagName(tagName)
        .orElseThrow(() -> new IllegalArgumentException("태그를 찾을 수 없습니다: " + tagName));

    postTagDao.deleteByPostIdAndTagId(postId, tag.getTagId());
  }

  @Override
  @Transactional
  public PostEntity writePost(String authenticatedUserSignId,
      PostCreationRequestDTO postCreationRequestDTO) {

    // PostEntity 생성
    PostEntity writeEntity = new PostEntity();
    writeEntity.setPost(
        authenticatedUserSignId,
        postCreationRequestDTO.getTitle(),
        postCreationRequestDTO.getContent(),
        postCreationRequestDTO.getIsPublished(),
        postCreationRequestDTO.getThumbnail()
    );

    //  Post 저장 (postId 생성됨)
    PostEntity savedPost = postDao.writePost(writeEntity);

    //  태그가 있다면 추가
    if (postCreationRequestDTO.getTags() != null &&
        !postCreationRequestDTO.getTags().isEmpty()) {
      addTagsToPost(savedPost.getPostId(), postCreationRequestDTO.getTags());
    }

    return savedPost;
  }

  @Transactional
  @Override
  public void incrementViewCount(Long postId) {
    postDao.incrementViewCount(postId);
  }


  @Transactional(readOnly = true)
  @Override
  public Page<PostEntity> getFeedPosts(String currentUserId, Pageable pageable) {
    ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    String authorizationHeader = null;

    if (attributes != null) {
      authorizationHeader = attributes.getRequest().getHeader("Authorization");
    }

    if (authorizationHeader == null) {
      // 토큰이 없으면 친구 목록을 가져올 수 없으므로, 빈 목록을 반환
      return postDao.findFeedPostsByAuthorIds(new ArrayList<>(), pageable);
    }
    List<String> friendIds = friendsFeignClient.getMSAFriendSignIds(authorizationHeader);
    if (friendIds == null) {
      friendIds = new ArrayList<>();
    }
    return postDao.findFeedPostsByAuthorIds(friendIds, pageable);
  }

  @Transactional(readOnly = true)
  @Override
  public Page<PostEntity> getRecentPosts(Pageable pageable) {
    return postDao.getRecentPosts(pageable);
  }

  @Transactional(readOnly = true)
  @Override
  public Page<PostEntity> getTrendingPosts(Pageable pageable) {
    LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
    return postDao.findTrendingPosts(sevenDaysAgo, pageable);
  }


  @Override
  public String uploadImage(MultipartFile file) throws IOException {
    // 1. 파일 이름 생성 (UUID 사용)
    String originalFilename = file.getOriginalFilename();
    String extension = "";
    if (originalFilename != null && originalFilename.contains(".")) {
      extension = originalFilename.substring(originalFilename.lastIndexOf("."));
    }
    String fileName = UUID.randomUUID().toString() + extension;

    BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName)
        .setContentType(file.getContentType())
        .build();

    // 3. GCS로 파일 전송 (기존 transferTo 대신 사용)
    storage.create(blobInfo, file.getBytes());
    log.info("GCS 파일 업로드 성공: {}/{}", bucketName, fileName);

    // 4. URL 반환
    return baseUrl.endsWith("/") ? baseUrl + fileName : baseUrl + "/" + fileName;
  }

  @Transactional
  @Override
  public Page<PostEntity> searchPosts(String keyword, Pageable pageable) {
    if (keyword == null || keyword.trim().isEmpty()) {
      throw new IllegalArgumentException("검색어를 입력해주세요.");
    }
    return postDao.searchPosts(keyword.trim(), pageable);
  }

  @Override
  public Page<PostEntity> getMyPosts(Pageable pageable, String id) {
    return postDao.findMyPosts(pageable, id);
  }
}
