package daul.userservice.dao;

import daul.userservice.entity.UsersEntity;
import java.util.List;

public interface UserDao {
  UsersEntity signUp(UsersEntity usersEntity);
  UsersEntity findByUserSignId(String userSignId);
  UsersEntity findByEmail(String email);
  boolean existsByUserSignId(String userSignId);
  boolean existsByNickName(String nickName);
  boolean existsByEmail(String email);

  List<UsersEntity> findUsersByIds(List<String> userSignIds);
}
