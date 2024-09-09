package com.anodos.contact_ms.domain.exception;

import org.springframework.http.HttpStatus;

public class ConflictException extends ApplicationException {

    private static final String STATUS_TEXT = "A solicitação não pôde ser atendida devido a um conflito com o estado atual do recurso de destino";

    public ConflictException(String message) {

        super(HttpStatus.CONFLICT, STATUS_TEXT, message);
    }


}
