package daul.userservice.controller;

import static org.springframework.http.ResponseEntity.ok;

import daul.userservice.dto.ChangeNickName;
import daul.userservice.dto.ChangePasswordRequest;
import daul.userservice.dto.FriendsResDto;
import daul.userservice.dto.LoginDTO;
import daul.userservice.dto.UsersDTO;
import daul.userservice.entity.UsersEntity;
import daul.userservice.service.FileStorageService;
import daul.userservice.service.UserService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
@RestControllerAdvice
public class UserController {

  private final UserService userService;
  private final FileStorageService fileStorageService;

  @GetMapping("/existId")
  public ResponseEntity<String> existUserId(@RequestParam("userId") String userId) {
    boolean exists = userService.existsByUserSignId(userId);
    return ResponseEntity.ok(exists ? "exists" : "not exists");
  }

  @GetMapping("/existEmail")
  public ResponseEntity<String> existEmail(@RequestParam("email") String email) {
    boolean exists = userService.existsByEmail(email);
    return ResponseEntity.ok(exists ? "exists" : "not exists");
  }

  @GetMapping("/existNickname")
  public ResponseEntity<String> existNickname(@RequestParam("nickname") String nickname) {
    boolean exists = userService.existsByNickName(nickname);
    return ResponseEntity.ok(exists ? "exists" : "not exists");
  }

  @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<String> signup(
      @Valid @ModelAttribute UsersDTO usersDTO,
      @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {
    try {
      log.info("use controller on signup");

      // 프로필 이미지 업로드 처리
      if (profileImage != null && !profileImage.isEmpty()) {
        String imageUrl = fileStorageService.storeFile(profileImage);
        usersDTO.setProfileImg(imageUrl);
      }

      userService.signUp(usersDTO);
      return ResponseEntity.status(HttpStatus.CREATED)
          .body("회원가입이 완료됐습니다.");

    } catch (IllegalArgumentException e) {
      log.error(e.getMessage());
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (RuntimeException e) {
      log.error(e.getMessage());
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    } catch (Exception e) {
      log.error(e.getMessage(), e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("회원가입 중 문제가 발생했습니다.");
    }
  }
  @PostMapping("/login")
  public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginDTO loginDTO) {

    Map<String, String> result = userService.login(loginDTO);

    HttpHeaders headers = new HttpHeaders();
    headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + result.get("accessToken"));

    return ok()
        .headers(headers)
        .body(Map.of(
            "userSignId", result.get("userSignId"),
            "role", result.get("role"),
            "refreshToken", result.get("refreshToken"),
            "profileImg",result.get("profileImg")
        ));
  }

  private ResponseEntity<FriendsResDto> handleFriendshipException(Exception e) {
    if (e instanceof IllegalArgumentException) {

      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } else if (e instanceof IllegalStateException) {
      String message = e.getMessage();
      if (message.contains("자기 자신")) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
      } else if (message.contains("이미 친구") || message.contains("이미 요청") || message.contains(
          "PENDING 상태가 아닙니다")) {

        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
      }
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
  }


  @GetMapping("/profile/{userSignId}")
  public ResponseEntity<Map<String, Object>> getUserProfile(@PathVariable("userSignId") String userSignId) {
    try {
      UsersEntity user = userService.findByUserSignId(userSignId);

      if (user == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
      }

      Map<String, Object> profile = new HashMap<>();
      profile.put("userSignId", user.getUserSignId());
      profile.put("userName", user.getUserName());
      profile.put("nickName", user.getNickName());
      profile.put("email", user.getEmail());
      profile.put("profileImg", user.getProfileImg());

      return ResponseEntity.ok(profile);

    } catch (Exception e) {
      log.error("프로필 조회 중 오류 발생: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // 여러 사용자 프로필 일괄 조회 (선택사항 - 성능 최적화용)
  @PostMapping("/profiles/batch")
  public ResponseEntity<List<Map<String, Object>>> getUserProfiles(
      @RequestBody List<String> userSignIds) {
    try {
      List<Map<String, Object>> profiles = userService.findUsersByIds(userSignIds)
          .stream()
          .map(user -> {
            Map<String, Object> profile = new HashMap<>();
            profile.put("userSignId", user.getUserSignId());
            profile.put("userName", user.getUserName());
            profile.put("nickName", user.getNickName());
            profile.put("profileImg", user.getProfileImg());
            return profile;
          })
          .collect(Collectors.toList());

      return ResponseEntity.ok(profiles);

    } catch (Exception e) {
      log.error("프로필 일괄 조회 중 오류 발생: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }


  @PostMapping(value = "/profile/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Map<String, String>> uploadProfileImage(
      @RequestHeader("userSignId") String userSignId, // 로그인 사용자 ID
      @RequestParam("file") MultipartFile profileImage) {

    try {
      if (profileImage.isEmpty()) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "파일이 존재하지 않습니다."));
      }

      String profileImgPath = fileStorageService.storeFile(profileImage);

      String updatedPath = userService.updateProfileImage(userSignId, profileImgPath);

      // 3. 응답 (새 경로 반환)
      return ResponseEntity.ok(Map.of(
          "profileImg", updatedPath,
          "message", "프로필 이미지가 성공적으로 업데이트되었습니다."
      ));

    } catch (IllegalArgumentException e) {
      // 사용자 없음 등의 에러 처리
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
    } catch (Exception e) {
      log.error("프로필 이미지 업데이트 중 오류 발생: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("message", "프로필 이미지 업데이트 중 서버 오류가 발생했습니다."));
    }
  }
  @PutMapping("profile/nickname")
    public ResponseEntity<Map<String, String>> updateNickname(
        @RequestHeader("userSignId") String userSignId,
        @Valid @RequestBody ChangeNickName changeNickName) {

      try {
        if (userService.existsByNickName(changeNickName.getNewNickName())) {
          return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "이미 존재하는 닉네임입니다."));
        }
        userService.changeNickname(userSignId, changeNickName.getNewNickName());
        // 3. 성공 응답
        return ResponseEntity.ok(Map.of(
            "message", "닉네임이 성공적으로 변경되었습니다."
        ));

      } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
      } catch (Exception e) {
        log.error("닉네임 변경 중 오류 발생: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(Map.of("message", "닉네임 변경 중 서버 오류가 발생했습니다."));
      }
  }

  @PutMapping("/profile/password")
  public ResponseEntity<Map<String, String>> changePassword(
      @RequestHeader("userSignId") String userSignId,
      @Valid @RequestBody ChangePasswordRequest request) {

    try {
      userService.changePassword(userSignId, request.getCurrentPassword(), request.getNewPassword());

      return ResponseEntity.ok(Map.of("message", "비밀번호가 성공적으로 변경되었습니다."));

    } catch (IllegalArgumentException e) {
      // 비밀번호 불일치, 사용자 없음 등 서비스 로직에서 발생한 예외 처리
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", e.getMessage()));
    } catch (Exception e) {
      log.error("비밀번호 변경 중 오류 발생: {}", e.getMessage());
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(Map.of("message", "비밀번호 변경 중 서버 오류가 발생했습니다."));
    }
  }
}
