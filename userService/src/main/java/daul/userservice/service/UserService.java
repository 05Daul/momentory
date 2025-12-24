package daul.userservice.service;

import daul.userservice.dto.LoginDTO;
import daul.userservice.dto.UsersDTO;
import daul.userservice.entity.UsersEntity;
import java.util.List;
import java.util.Map;

public interface UserService {


  String updateProfileImage(String userSignId, String profileImgPath);

  void changePassword(String userSignId, String currentPassword, String newPassword);

  void changeNickname(String userSignId, String nickname);

  void signUp(UsersDTO usersDTO);

  Map<String, String> login(LoginDTO loginDTO);

  boolean existsByUserSignId(String userSignId);

  boolean existsByNickName(String nickName);

  boolean existsByEmail(String email);

  UsersEntity findByUserSignId(String userSignId);

  List<UsersEntity> findUsersByIds(List<String> userSignIds);


}
