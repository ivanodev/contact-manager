package com.anodos.contact_ms.domain.exception;

import org.springframework.http.HttpStatus;

public class BadRequestException extends ApplicationException {

    private static final String STATUS_TEXT = "O servidor não processará a requisição por um erro nas informações enviadas";

    public BadRequestException(String message) {

        super(HttpStatus.BAD_REQUEST, STATUS_TEXT, message);
    }
}
