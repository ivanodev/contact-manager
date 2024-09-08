package com.anodos.contactms.domain.exception;

public class DataBasePersistenceException extends InternalServerErrorException {

    private static final String MESSAGE = "Erro de persistência de dados na tabela %s - %s";

    public DataBasePersistenceException(String tableName, String exceptionMessage) {

        super(String.format(MESSAGE, tableName, exceptionMessage));
    }

    public DataBasePersistenceException(String exceptionMessage) {

        super(exceptionMessage);
    }
}
