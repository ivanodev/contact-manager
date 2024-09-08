package com.anodos.contact_ms.domain.exception;

import org.springframework.http.HttpStatus;

public class InternalServerErrorException extends ApplicationException {

    private static final String STATUS_TEXT = "O servidor encontrou uma condição inesperada que o impediu de processar completamente a requisição";

    public InternalServerErrorException(String message) {

        super(HttpStatus.INTERNAL_SERVER_ERROR, STATUS_TEXT, message);
    }
}
