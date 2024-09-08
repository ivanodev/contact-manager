package com.anodos.contact_ms.domain.exception;

public class ErrorData {
    private final String message;
    private final String field;
    private final Object parameter;

    public ErrorData(final String message, final String field, final Object parameter) {
        this.message = message;
        this.field = field;
        this.parameter = parameter;
    }

    public String getMessage() {
        return message;
    }

    public String getField() {
        return field;
    }

    public Object getParameter() {
        return parameter;
    }
}
