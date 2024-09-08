package com.anodos.contact_ms.domain.entity;

import com.anodos.contact_ms.domain.exception.BadRequestException;
import com.anodos.contact_ms.utils.ANStringUtils;

public class Contact {

    private String id;
    private String name;
    private Email email;
    private Address address;
    private Phone phone;

    public Contact(final String id, final String name, final Email email, final Address address, final Phone phone) {
        this.validateValue(id, "Id");
        this.validateValue(name, "Name");
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }

    public Contact(final String name, final Email email, final Address address, final Phone phone) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        if (email == null) return "";
        return email.getAddress();
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getPhone() {
        if (phone == null) return "";
        return phone.getFullNumber();
    }

    public void setPhone(Phone phone) {
        this.phone = phone;
    }

    private void validateValue(final String value, final String name) {

        if (ANStringUtils.isNullOrBlank(value)) {
            throw new BadRequestException(name + "cannot be empty or null");
        }
    }
}
