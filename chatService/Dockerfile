# Gradle 빌드 스테이지
FROM gradle:8.11.1-jdk17 AS build

# 작업 디렉토리 설정
WORKDIR /myapp

# 전체 프로젝트 복사
COPY . /myapp

# 실행 권한 부여
RUN chmod +x gradlew

RUN ./gradlew :chatService:clean :chatService:bootJar --no-daemon -x test

FROM eclipse-temurin:17-jre-alpine

# 작업 디렉토리 설정
WORKDIR /myapp

# 빌드 결과 JAR 파일 복사
COPY --from=build /myapp/chatService/build/libs/*.jar /myapp/chatService.jar
ENV SPRING_PROFILES_ACTIVE=prod
ENV TZ=Asia/Seoul
# 포트
EXPOSE 1005

# 실행 명령
ENTRYPOINT ["java", "-jar", "/myapp/chatService.jar"]