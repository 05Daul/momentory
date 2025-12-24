package daul.communityservice.repository;

import daul.communityservice.entity.comment.CommentEntity;
import daul.communityservice.entity.tag.CommunityPostType;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

  List<CommentEntity> findByParentCommentId(Long parentCommentId);


  @Query("SELECT c FROM CommentEntity c WHERE c.communityId = :communityId " +
      "AND c.communityType = :communityType AND c.isDeleted = false " +
      "ORDER BY c.createdAt ASC, c.commentId ASC")
  List<CommentEntity> findActiveCommunityComments(
      @Param("communityId") Long communityId,
      @Param("communityType") CommunityPostType communityType);

  // 댓글 수 카운트
  Long countByCommunityIdAndCommunityTypeAndIsDeleted(
      Long communityId, CommunityPostType communityType, Boolean isDeleted);

}