package com.anodos.contact_ms.domain.entity;

import com.anodos.contact_ms.domain.exception.BadRequestException;
import com.anodos.contact_ms.utils.ANStringUtils;

public class Address {

    private String id;
    private String contactId;
    private String street;
    private String number;
    private String complement;
    private String city;
    private String state;
    private String postalCode;
    private String country;

    public Address(String id, String street, String number, String city, String state, String postalCode, String country, String complement) {

        this.validateValue(id, "Id");
        this.validateValue(street, "Street");
        this.validateValue(number, "Number");
        this.validateValue(city, "City");
        this.validateValue(state, "State");
        this.validateValue(postalCode, "PostalCode");
        this.validateValue(country, "Country");

        this.id = id;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
        this.complement = complement;
    }

    public Address(String street, String number, String city, String state, String postalCode, String country, String complement) {

        this.validateValue(street, "Street");
        this.validateValue(number, "Number");
        this.validateValue(city, "City");
        this.validateValue(state, "State");
        this.validateValue(postalCode, "PostalCode");
        this.validateValue(country, "Country");

        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
        this.complement = complement;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getComplement() {
        return complement;
    }

    public void setComplement(String complement) {
        this.complement = complement;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }


    private void validateValue(final String value, final String name) {

        if (ANStringUtils.isNullOrBlank(value)) {
            throw new BadRequestException(name + "cannot be empty or null");
        }
    }
}

