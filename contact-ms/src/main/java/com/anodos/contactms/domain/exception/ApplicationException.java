package com.anodos.contactms.domain.exception;

import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

public class ApplicationException extends RuntimeException {

    private final HttpStatus httpStatus;
    private final String statusText;
    private final List<ErrorData> errorsData = new ArrayList<>();

    public ApplicationException(final HttpStatus httpStatus, final String statusText, final String message) {

        super(message);
        this.httpStatus = httpStatus;
        this.statusText = statusText;
    }

    public ApplicationException(final String message) {

        super(message);
        this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        this.statusText = httpStatus.getReasonPhrase();
    }

    public void addErrorData(final String message, final String fieldName, final Object parameter) {
        errorsData.add(new ErrorData(message, fieldName, parameter));
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getStatusText() {
        return statusText;
    }

    public List<ErrorData> getErrorsData() {
        return errorsData;
    }

}
