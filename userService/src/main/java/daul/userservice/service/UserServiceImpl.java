package daul.userservice.service;

import daul.userservice.auth.service.AuthService;
import daul.userservice.dao.UserDao;
import daul.userservice.dto.LoginDTO;
import daul.userservice.dto.UsersDTO;
import daul.userservice.entity.UsersEntity;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserDao userDao;
  private final PasswordEncoder bCryptPasswordEncoder;
  private final AuthenticationManager authenticationManager;
  private final AuthService authService;

  @Override
  public boolean existsByEmail(String email) {
    return userDao.existsByEmail(email);
  }

  @Override
  public boolean existsByUserSignId(String userSignId) {
    return userDao.existsByUserSignId(userSignId);
  }

  @Override
  public boolean existsByNickName(String nickName) {

    return userDao.existsByNickName(nickName);
  }

  @Override
  public void signUp(UsersDTO usersDTO) {
    DuplicateUserSignId(usersDTO);
    DuplicateEmail(usersDTO);
    if (userDao.existsByUserSignId(usersDTO.getUserSignId())) {
      throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
    }
    if (userDao.existsByNickName(usersDTO.getNickName())) {
      throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
    }
    if (userDao.existsByEmail(usersDTO.getEmail())) {
      throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
    }

    UsersEntity usersEntity = new UsersEntity(
        usersDTO.getUserSignId(),
        usersDTO.getUserName(),
        usersDTO.getPassword(),
        usersDTO.getNickName(),
        usersDTO.getEmail(),
        usersDTO.getProfileImg()
    );
    usersEntity.hashPassword(bCryptPasswordEncoder);
    userDao.signUp(usersEntity);
  }

  @Override
  @Transactional
  public void changePassword(String userSignId, String currentPassword, String newPassword) {
    UsersEntity usersEntity = userDao.findByUserSignId(userSignId);
    if (usersEntity == null) {
      throw new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userSignId);
    }

    // 1. 현재 비밀번호 검증
    if (!bCryptPasswordEncoder.matches(currentPassword, usersEntity.getPassword())) {
      throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
    }

    // 2. 새 비밀번호가 현재 비밀번호와 동일한지 체크
    if (bCryptPasswordEncoder.matches(newPassword, usersEntity.getPassword())) {
      throw new IllegalArgumentException("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
    }

    // 3. 새 비밀번호를 해시하여 저장
    usersEntity.setPassword(newPassword);
    usersEntity.hashPassword(bCryptPasswordEncoder);

  }


  @Override
  @Transactional
  public void changeNickname(String userSignId, String newNickname) {
    UsersEntity usersEntity = userDao.findByUserSignId(userSignId);
    if (usersEntity == null) {
      throw new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userSignId);
    }

    usersEntity.setNickName(newNickname);
  }

  @Override
  @Transactional
  public String updateProfileImage(String userSignId, String profileImgPath) {
    UsersEntity usersEntity = userDao.findByUserSignId(userSignId);
    if (usersEntity == null) {
      throw new IllegalArgumentException("사용자를 찾을 수 없습니다: " + userSignId);
    }

    usersEntity.setProfileImg(profileImgPath);
    return usersEntity.getProfileImg();

  }

  @Override
  public Map<String, String> login(LoginDTO loginDTO) {

    // 1. 스프링 시큐리티 인증 처리
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            loginDTO.getUserSignId(),
            loginDTO.getPassword()
        )
    );

    // 2. DB에서 사용자 정보 조회
    UsersEntity usersEntity = userDao.findByUserSignId(loginDTO.getUserSignId());
    if (usersEntity == null) {
      throw new RuntimeException("사용자가 존재하지 않습니다.");
    }

    String role = usersEntity.getRoleName().toString();
    String profileImg = usersEntity.getProfileImg();

    // 3. 토큰 생성
    String accessToken = authService.generateToken(usersEntity.getUserSignId(), role, profileImg);
    String refreshToken = authService.generateRefreshToken(usersEntity.getUserSignId());

    // 4. Controller가 header에 넣을 수 있도록 AccessToken 포함 반환
    Map<String, String> response = new HashMap<>();
    response.put("userSignId", usersEntity.getUserSignId());
    response.put("role", role);
    response.put("accessToken", accessToken);
    response.put("refreshToken", refreshToken);

    // 프로필 이미지가 있으면 추가
    if (usersEntity.getProfileImg() != null) {
      response.put("profileImg", profileImg);
    }
    return response;
  }


  private void DuplicateEmail(UsersDTO usersDTO) {
    if (userDao.findByEmail(usersDTO.getEmail()) != null) {
      throw new RuntimeException("이미 존재하는 이메일입니다.");
    }
  }

  private void DuplicateUserSignId(UsersDTO usersDTO) {
    if (userDao.findByUserSignId(usersDTO.getUserSignId()) != null) {
      throw new RuntimeException("이미 존재하는 아이디입니다.");
    }
  }

  private UsersEntity findUser(String signId, String role) {
    UsersEntity user = userDao.findByUserSignId(signId);

    if (user == null) {
      // 사용자를 찾지 못하면 즉시 예외 발생
      throw new IllegalArgumentException(role + " 사용자(" + signId + ")를 찾을 수 없습니다.");
    }
    return user;
  }

  @Override
  public UsersEntity findByUserSignId(String userSignId) {
    return userDao.findByUserSignId(userSignId);
  }

  @Override
  public List<UsersEntity> findUsersByIds(List<String> userSignIds) {
    return userDao.findUsersByIds(userSignIds);
  }
}
