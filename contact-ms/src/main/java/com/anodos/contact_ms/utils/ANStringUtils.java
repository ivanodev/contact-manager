package com.anodos.contact_ms.utils;

import java.util.Objects;

public class ANStringUtils {

    private ANStringUtils() {
    }

    public static boolean isNull(String str) {

        return Objects.isNull(str);
    }

    public static boolean nonNull(String str) {

        return Objects.nonNull(str);
    }

    public static boolean isNullOrBlank(String value) {

        return isNull(value) || value.isBlank();
    }

    public static Boolean isEmpty(String value) {
        return isNull(value) || value.isEmpty() || value.isBlank();
    }

    public static Boolean nonEmpty(String value) {
        return nonNull(value) && !value.isEmpty() && !value.isBlank();
    }
}
