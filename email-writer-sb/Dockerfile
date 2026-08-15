FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

# Copy only what is needed for dependency resolution first
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src src

RUN mvn -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=build /workspace/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
