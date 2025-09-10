# 1단계: Gradle로 빌드
FROM gradle:7-jdk17 AS build
WORKDIR /app

# Gradle 파일들 복사
COPY build.gradle .
COPY settings.gradle .
COPY gradle/ gradle/

# 의존성 다운로드 (캐시 최적화)
RUN gradle dependencies --no-daemon

# 소스코드 복사
COPY src/ src/

# JAR 파일 빌드 (테스트 제외)
RUN gradle build -x test --no-daemon

# 2단계: 실행 환경
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 JAR 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 포트 8080 노출
EXPOSE 8080

# JVM 옵션 설정
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# 애플리케이션 실행
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
