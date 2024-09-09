package com.anodos.contact_ms.domain.exception;

import org.springframework.http.HttpStatus;

public class UnauthenticatedException extends ApplicationException {

    private static final String STATUS_TEXT = "User is not authenticated";

    public UnauthenticatedException(String message) {

        super(HttpStatus.UNAUTHORIZED, STATUS_TEXT, message);
    }
}

