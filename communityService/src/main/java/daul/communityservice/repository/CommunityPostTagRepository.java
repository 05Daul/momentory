package daul.communityservice.repository;

import daul.communityservice.entity.tag.CommunityPostTagEntity;
import daul.communityservice.entity.tag.CommunityPostTagId;
import daul.communityservice.entity.tag.CommunityPostType;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityPostTagRepository extends
    JpaRepository<CommunityPostTagEntity, CommunityPostTagId> {

  List<CommunityPostTagEntity> findByIdCommunityId(Long communityId);

  List<CommunityPostTagEntity> findByIdCommunityIdAndCommunityType(
      Long communityId, CommunityPostType communityType);


  // 특정 태그 전체 삭제 (운영자가 태그 삭제할 때)
  void deleteByIdTagId(Long tagId);
}
