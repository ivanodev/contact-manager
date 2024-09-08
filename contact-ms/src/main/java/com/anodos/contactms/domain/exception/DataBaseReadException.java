package com.anodos.contactms.domain.exception;

public class DataBaseReadException extends InternalServerErrorException {

    private static final String MESSAGE = "Erro de leitura de dados na tabela %s - %s";

    public DataBaseReadException(String tableName, String exceptionMessage) {

        super(String.format(MESSAGE, tableName, exceptionMessage));
    }

    public DataBaseReadException(String exceptionMessage) {

        super(exceptionMessage);
    }
}
