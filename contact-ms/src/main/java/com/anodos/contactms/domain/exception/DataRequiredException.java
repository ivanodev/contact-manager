package com.anodos.contactms.domain.exception;

public class DataRequiredException extends BadRequestException {

    public DataRequiredException(String message) {

        super(message);
    }
}
