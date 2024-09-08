package com.anodos.contactms.domain.exception;

import org.springframework.http.HttpStatus;

public class UnprocessableEntityException extends ApplicationException {

    private static final String STATUS_TEXT = "Os dados enviados não podem ser processados pelo servidor";

    public UnprocessableEntityException(String message) {

        super(HttpStatus.UNPROCESSABLE_ENTITY, STATUS_TEXT, message);
    }
}
