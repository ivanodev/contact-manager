package com.anodos.contact_ms.domain.exception;

public class DataBasePersistenceException extends InternalServerErrorException {

    private static final String MESSAGE = "Data persistence error in table %s - %s";

    public DataBasePersistenceException(String tableName, String exceptionMessage) {

        super(String.format(MESSAGE, tableName, exceptionMessage));
    }

    public DataBasePersistenceException(String exceptionMessage) {

        super(exceptionMessage);
    }
}
