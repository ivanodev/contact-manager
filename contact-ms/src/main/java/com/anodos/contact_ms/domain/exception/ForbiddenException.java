package com.anodos.contact_ms.domain.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends ApplicationException {

    private static final String STATUS_TEXT = "User is not authorized to perform this action";

    public ForbiddenException(String message) {

        super(HttpStatus.FORBIDDEN, STATUS_TEXT, message);
    }
}

