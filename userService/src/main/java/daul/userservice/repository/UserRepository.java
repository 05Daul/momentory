package daul.userservice.repository;

import daul.userservice.entity.UsersEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UsersEntity, Long> {


    UsersEntity getReferenceById(Long aLong);

    UsersEntity save(UsersEntity userEntity);
    List<UsersEntity> findByUserSignIdIn(List<String> userSignIds);
    UsersEntity findByUserSignId(String userSignId);

    boolean existsByUserSignId(String userSignId);
    boolean existsByNickName(String nickName);

  boolean existsByEmail(String email);
}
