# Gradle 빌드 스테이지
FROM gradle:8.11.1-jdk17 AS build

# 작업 디렉토리 설정
WORKDIR /myapp

# 전체 프로젝트 복사
COPY . /myapp

# 실행 권한 부여
RUN chmod +x gradlew

# 특정 모듈(AttendanceSalary)만 빌드하도록 수정
RUN ./gradlew :blogService:clean :blogService:bootJar --no-daemon -x test

FROM eclipse-temurin:17-jre-alpine

# 작업 디렉토리 설정
WORKDIR /myapp

# 빌드 결과 JAR 파일 복사
COPY --from=build /myapp/blogService/build/libs/*.jar /myapp/blogService.jar
ENV SPRING_PROFILES_ACTIVE=prod
ENV TZ=Asia/Seoul
# 포트
EXPOSE 1004

# 실행 명령
ENTRYPOINT ["java", "-jar", "/myapp/blogService.jar"]