FROM maven:3.8.5-openjdk-17 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo pom.xml e o diretório src para o container
COPY pom.xml .
COPY src ./src

# Baixa as dependências e compila o projeto
RUN mvn clean package -DskipTests

# Define a imagem base para a aplicação em execução
FROM openjdk:17.0.1-jdk-slim

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo JAR gerado no estágio de construção
COPY --from=build /app/target/contact-ms-0.0.1-SNAPSHOT.jar contact-ms.jar

# Expõe a porta 4001
EXPOSE 4001

# Define o comando para rodar a aplicação
CMD ["java", "-jar", "contact-ms.jar"]