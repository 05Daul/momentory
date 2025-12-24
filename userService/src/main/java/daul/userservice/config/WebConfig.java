// src/main/java/daul/userservice/config/WebConfig.java (예시)

package daul.userservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // application.yml의 ${file.upload-dir} 값을 주입받음
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 
        // 클라이언트 요청 경로: /uploads/profiles/ + 파일명
        // 실제 서버의 파일 경로: file: + /Users/dual/.../uploads/profiles + / + 파일명

        registry.addResourceHandler("/uploads/profiles/**")
                // file: 접두사를 사용하여 로컬 파일 시스템 경로임을 명시하고,
                // 끝에 슬래시(/)를 추가하여 정확한 매핑을 보장합니다.
                .addResourceLocations("file:" + uploadDir + "/");
    }
}