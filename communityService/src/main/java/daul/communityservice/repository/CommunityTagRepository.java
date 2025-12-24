package daul.communityservice.repository;

import daul.communityservice.entity.tag.CommunityPostTagEntity;
import daul.communityservice.entity.tag.CommunityTagEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityTagRepository extends JpaRepository<CommunityTagEntity, Long> {

  // 태그명으로 조회
  Optional<CommunityTagEntity> findByTagName(String tagName);

  // 여러 태그 조회
  List<CommunityTagEntity> findByTagIdIn(List<Long> tagIds);

}
