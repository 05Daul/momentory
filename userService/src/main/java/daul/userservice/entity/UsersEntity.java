package daul.userservice.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.crypto.password.PasswordEncoder;

@Entity
@Table(name = "users_Entity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsersEntity {
  @Id
  @Column(nullable = false,unique = true,length = 16)
  private String userSignId;

  @Column(nullable = false, unique = true,length = 50)
  private String email;

  @Column(nullable = false, length = 20)
  private String userName;

  @Column(nullable = false,unique = true, length = 10)
  private String nickName;

  @Column(nullable = false,length = 64)
  private String password;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoleStatus roleName= RoleStatus.USER;
  /// USER 는 예약어로 오류가 발생해, 현재와 같이 작성

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private UserStatus status = UserStatus.ACTIVE; //ACTIVE(활성),DEACTIVATED(비활성), SUSPENDED(해지)

  @Column(nullable = false)
  @CreationTimestamp
  private LocalDateTime createdAt;

  @Column(nullable = true)
  @UpdateTimestamp
  private LocalDateTime updatedAt;

  @Column(nullable = true)
  private String profileImg;

  public UsersEntity hashPassword(PasswordEncoder passwordEncoder) {
    this.password = passwordEncoder.encode(this.password);
    return this;
  }

  public UsersEntity(String userSignId,String userName, String password,
      String nickName, String email ,String profileImg) {
    this.userSignId = userSignId;
    this.userName = userName;
    this.profileImg = profileImg;
    this.password = password;
    this.nickName = nickName;
    this.email = email;
  }
}
