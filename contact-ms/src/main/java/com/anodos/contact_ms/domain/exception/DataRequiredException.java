package com.anodos.contact_ms.domain.exception;

public class DataRequiredException extends BadRequestException {

    public DataRequiredException(String message) {

        super(message);
    }
}
