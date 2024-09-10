package com.anodos.contact_ms.application;

import com.anodos.contact_ms.domain.entity.ANToken;
import com.anodos.contact_ms.domain.entity.Credential;
import com.anodos.contact_ms.domain.exception.ForbiddenException;
import com.anodos.contact_ms.domain.exception.UnauthenticatedException;
import com.anodos.contact_ms.infra.http.webclient.AuthWebClient;

import java.util.Arrays;
import java.util.List;

public class Authentication {

    private final AuthWebClient authWebClient;
    private Credential credential;

    public Authentication(final AuthWebClient authWebClient) {
        this.authWebClient = authWebClient;
    }

    public void isAuthorized(final String authorization, final String roleName) {

        this.isAuthenticated(authorization);

        List<String> roles = Arrays.asList(this.credential.getRoles());

        final boolean authorized = roles.contains(roleName);
        if (!authorized) {
            throw new ForbiddenException("Authorization Error");
        }
    }

    public void isAuthenticated(final String authorization) {

        final String token = this.getTokenFromHeader(authorization);
        this.loadCredential(token);
        final boolean authenticated = this.credential != null;

        if (!authenticated) {
            throw new UnauthenticatedException("Authentication Error");
        }
    }

    public void loadCredential(final String token) {

        final ANToken anToken = new ANToken(token);
        if (this.credential == null) {
            this.credential = authWebClient.getCredential(anToken);
        }
    }

    public Credential getCredential() {
        return credential;
    }

    private String getTokenFromHeader(final String authorization) {
        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);
        } else {
            throw new UnauthenticatedException("Invalid Authorization header");
        }
    }
}
