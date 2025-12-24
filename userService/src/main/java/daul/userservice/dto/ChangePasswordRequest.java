package daul.userservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChangePasswordRequest {

  private String CurrentPassword;

  @NotBlank(message = "비밀번호가 입력되지 않았습니다.")
  @Size(min = 8, message = "비밀번호는 최소 8자 이상이어야 합니다.")
  @Pattern(
      regexp = "^(?=.*[!@#$%^&*(),.?\":{}|<>]).+$",
      message = "비밀번호에는 최소 하나의 특수문자가 포함되어야 합니다."
  )
  private String newPassword;

}

