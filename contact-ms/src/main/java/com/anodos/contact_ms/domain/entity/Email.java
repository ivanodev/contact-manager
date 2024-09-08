package com.anodos.contact_ms.domain.entity;

import com.anodos.contact_ms.domain.exception.BadRequestException;

import java.util.regex.Pattern;

public class Email {

    private static final String EMAIL_REGEX = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    private final String address;

    public Email(final String emailAddress) {
        this.emailValidate(emailAddress);
        this.address = emailAddress;
    }

    public String getAddress() {
        return address;
    }

    private void emailValidate(String emailAddress) {
        final boolean valid = EMAIL_PATTERN.matcher(emailAddress).matches();
        if (valid) return;

        throw new BadRequestException("The email address is invalid");
    }
}

