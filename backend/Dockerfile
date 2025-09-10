# 1단계: Gradle로 빌드
FROM gradle:7-jdk17 AS build
WORKDIR /app
COPY build.gradle .
COPY settings.gradle .
COPY gradle/ gradle/
RUN gradle dependencies --no-daemon
COPY src/ src/
RUN gradle build -x test --no-daemon

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
