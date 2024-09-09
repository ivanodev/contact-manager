package com.anodos.contact_ms.domain.entity;

import java.util.Set;

public class Credential {

    private String userId;
    private String token;
    private Set<String> roles;
    private int expireTime;

    public Credential() {

    }

    public String getUserId() {
        return userId;
    }

    public String getToken() {
        return token;
    }

    public String[] getRoles() {
        if (roles != null) {
            return roles.toArray(new String[0]);
        }
        return new String[0];
    }

    public int getExpireTime() {
        return expireTime;
    }
}
