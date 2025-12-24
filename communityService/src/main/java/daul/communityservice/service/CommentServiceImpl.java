package daul.communityservice.service;

import daul.communityservice.dto.CommentResponse;
import daul.communityservice.dto.CreateCommentRequest;
import daul.communityservice.dto.UpdateCommentRequest;
import daul.communityservice.entity.comment.CommentEntity;
import daul.communityservice.entity.tag.CommunityPostType;
import daul.communityservice.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;

  @Override
  @Transactional(readOnly = true)
  public Long getCommentCount(Long communityId, CommunityPostType type) {
    return commentRepository.countByCommunityIdAndCommunityTypeAndIsDeleted(communityId, type, false);
  }

  @Override
  public Long createComment(Long communityId, CommunityPostType type,
      CreateCommentRequest request, String userId) {

    // 1. 대댓글인 경우 부모 댓글 검증
    if (request.getParentCommentId() != null) {
      CommentEntity parentComment = commentRepository.findById(request.getParentCommentId())
          .orElseThrow(() -> new IllegalArgumentException(
              "부모 댓글을 찾을 수 없습니다. ID: " + request.getParentCommentId()));

      // 부모 댓글의 communityId와 type이 일치하는지 확인
      if (!parentComment.getCommunityId().equals(communityId)
          || !parentComment.getCommunityType().equals(type)) {
        throw new IllegalArgumentException("부모 댓글이 해당 게시글에 속하지 않습니다.");
      }

      // 부모 댓글이 삭제된 상태인지 확인
      if (parentComment.getIsDeleted()) {
        throw new IllegalStateException("삭제된 댓글에는 답글을 작성할 수 없습니다.");
      }
    }

    // 2. CommentEntity 생성 및 저장
    CommentEntity newComment = CommentEntity.builder()
        .communityId(communityId)
        .communityType(type)
        .userId(userId)
        .content(request.getContent())
        .parentCommentId(request.getParentCommentId())
        .isDeleted(false)
        .build();

    CommentEntity savedComment = commentRepository.save(newComment);

    // 3. 생성된 댓글의 ID 반환
    return savedComment.getCommentId();
  }

  @Override
  @Transactional(readOnly = true)
  public List<CommentResponse> getComments(Long communityId, CommunityPostType type) {
    //  해당 게시글의 활성화된 모든 댓글 조회 (삭제되지 않은 댓글만)
    List<CommentEntity> allComments = commentRepository.findActiveCommunityComments(communityId, type);

    // 2. 모든 대댓글들을 부모 ID로 그룹화
    Map<Long, List<CommentEntity>> repliesMap = allComments.stream()
        .filter(CommentEntity::isReply)
        .collect(Collectors.groupingBy(CommentEntity::getParentCommentId));

    // 3. 최상위 댓글만 필터링하고 재귀 함수를 이용해 N단계 계층 구조를 조립.
    return allComments.stream()
        .filter(comment -> !comment.isReply())
        .map(rootComment -> buildCommentTree(rootComment, repliesMap))
        .collect(Collectors.toList());
  }

  private CommentResponse buildCommentTree(CommentEntity currentComment,
      Map<Long, List<CommentEntity>> repliesMap) {

    List<CommentEntity> childEntities = repliesMap.getOrDefault(currentComment.getCommentId(), List.of());

    List<CommentResponse> childResponses = childEntities.stream()
        .map(childEntity -> buildCommentTree(childEntity, repliesMap))
        .collect(Collectors.toList());

    return CommentResponse.fromWithReplies(currentComment, childResponses);
  }

  @Override
  @Transactional(readOnly = true)
  public List<CommentResponse> getReplies(Long parentCommentId) {
    // 특정 댓글의 대댓글 조회
    List<CommentEntity> replies = commentRepository.findByParentCommentId(parentCommentId);

    return replies.stream()
        .filter(reply -> !reply.getIsDeleted()) // 삭제되지 않은 대댓글만
        .map(CommentResponse::from)
        .collect(Collectors.toList());
  }

  @Override
  public void deleteComment(Long communityId, CommunityPostType type, Long commentId,
      String userId) {
    CommentEntity comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다. ID: " + commentId));

    if (!comment.getUserId().equals(userId)) {
      throw new IllegalStateException("댓글 삭제 권한이 없습니다.");
    }
    if (!comment.getCommunityId().equals(communityId) || !comment.getCommunityType().equals(type)) {
      throw new IllegalArgumentException("요청 정보가 댓글과 일치하지 않습니다.");
    }

    comment.setIsDeleted(true);

  }

  @Override
  public void updateComment(Long communityId, CommunityPostType type, Long commentId,
      UpdateCommentRequest request, String userId) {

    CommentEntity comment = commentRepository.findById(commentId)
        .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다. ID: " + commentId));

    if (!comment.getUserId().equals(userId)) {
      throw new IllegalStateException("댓글 수정 권한이 없습니다.");
    }

    if (!comment.getCommunityId().equals(communityId) || !comment.getCommunityType().equals(type)) {
      throw new IllegalArgumentException("요청 정보가 댓글과 일치하지 않습니다.");
    }

    comment.setContent(request.getContent());
  }
}