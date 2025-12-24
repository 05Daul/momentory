package daul.common;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "daul.common.jwt"         // common-jwt
})
public class CommonApplication {

  public CommonApplication() {
  }

  public static void main(String[] args) {
    SpringApplication.run(CommonApplication.class, args);
  }

}
