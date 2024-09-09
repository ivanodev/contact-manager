package com.anodos.contact_ms.infra.http.webclient;

import com.anodos.contact_ms.domain.entity.ANToken;
import com.anodos.contact_ms.domain.entity.Credential;
import com.anodos.contact_ms.domain.exception.InternalServerErrorException;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

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
            return webClient.post()
                    .uri(URI_AUTHENTICATION)
                    .bodyValue(token)
                    .retrieve()
                    .bodyToMono(Credential.class)
                    .block();
        } catch (RuntimeException e) {
            throw new InternalServerErrorException("There was an error checking the user's authentication - " + e.getMessage());
        }
    }
}