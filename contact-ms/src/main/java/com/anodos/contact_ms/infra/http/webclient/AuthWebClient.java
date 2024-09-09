package com.anodos.contact_ms.infra.http.webclient;

import com.anodos.contact_ms.domain.entity.ANToken;
import com.anodos.contact_ms.domain.entity.Credential;
import com.anodos.contact_ms.domain.exception.ForbiddenException;
import com.anodos.contact_ms.domain.exception.InternalServerErrorException;
import com.anodos.contact_ms.domain.exception.UnauthenticatedException;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class AuthWebClient {

    private static final String URL_AUTH_MS = "http://%s:4000/anodos/contact-manager/auths";
    private static final String URI_AUTHENTICATION = "/authentication";
    private static Gson gson = new Gson();
    private final WebClient webClient;

    public AuthWebClient(WebClient.Builder webClientBuilder) {
        final String url = this.defineAuthMSHost();
        this.webClient = webClientBuilder.baseUrl(url)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    private String defineAuthMSHost() {
        final String authMsHost = System.getenv("AUTH_MS_HOST");
        return authMsHost == null ? String.format(URL_AUTH_MS, "localhost") : String.format(URL_AUTH_MS, authMsHost);
    }

    public Credential getCredential(final ANToken token) {

        try {
            final String response = webClient.post()
                    .uri(URI_AUTHENTICATION)
                    .bodyValue(token)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return gson.fromJson(response, Credential.class);
        } catch (RuntimeException e) {

            if (e instanceof WebClientResponseException webClientResponseException) {
                if (webClientResponseException.getStatusCode().isSameCodeAs(HttpStatus.UNAUTHORIZED)) {
                    throw new UnauthenticatedException("Authentication error");
                }

                if (webClientResponseException.getStatusCode().isSameCodeAs(HttpStatus.FORBIDDEN)) {
                    throw new ForbiddenException("Authentication error");
                }
            }

            throw new InternalServerErrorException("Authentication error - " + e.getMessage());
        }
    }
}