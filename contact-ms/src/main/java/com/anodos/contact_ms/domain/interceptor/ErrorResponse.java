package com.anodos.contact_ms.domain.interceptor;

import com.anodos.contact_ms.domain.exception.ErrorData;

import java.util.List;

public class ErrorResponse {

    private final String error;
    private final String details;
    private final Integer code;
    private final String status;

    public ErrorResponse(String error, String details, Integer code, String status, List<ErrorData> validations) {
        this.error = error;
        this.details = details;
        this.code = code;
        this.status = status;
    }

    public ErrorResponse(String error, String details) {
        this.error = error;
        this.details = details;
        this.code = null;
        this.status = null;
    }

    public String getError() {
        return error;
    }

    public String getDetails() {
        return details;
    }

    public int getCode() {
        return code;
    }

    public String getStatus() {
        return status;
    }
}