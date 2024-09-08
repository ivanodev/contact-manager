package com.anodos.contact_ms.domain.entity;

import com.anodos.contact_ms.domain.exception.BadRequestException;
import com.anodos.contact_ms.utils.ANStringUtils;

public class Phone {

    private String countryCode;
    private String areaCode;
    private String number;

    public Phone(final String countryCode, final String areaCode, final String number) {

        this.validateValue(countryCode, "CountryCode");
        this.validateValue(areaCode, "AreaCode");
        this.validateValue(number, "Number");
        this.countryCode = countryCode;
        this.areaCode = areaCode;
        this.number = number;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getFullNumber() {
        return countryCode + areaCode + number;
    }

    private void validateValue(final String value, final String name) {

        if (ANStringUtils.isNullOrBlank(value)) {
            throw new BadRequestException(name + "cannot be empty or null");
        }

        final boolean onlyNumber = value != null && value.matches("\\d+");
        if (!onlyNumber) throw new BadRequestException("Phone number consists of only numbers");
    }
}