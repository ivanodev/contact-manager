package com.anodos.contact_ms.domain.exception;

import org.springframework.http.HttpStatus;

public class NotFoundException extends ApplicationException {

    private static final String STATUS_TEXT = "O recurso solicitado não foi encontrado";

    public NotFoundException(String message) {

        super(HttpStatus.NOT_FOUND, STATUS_TEXT, message);
    }
}
