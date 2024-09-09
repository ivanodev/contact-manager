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

    public boolean isAuthorized(final String token, final String roleName) {

        this.isAuthenticated(token);
        List<String> roles = Arrays.asList(this.credential.getRoles());

        final boolean authorized = roles.contains(roleName);
        if (authorized) return true;

        throw new ForbiddenException("Authorization Error");
    }

    public void isAuthenticated(final String token) {

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


}
