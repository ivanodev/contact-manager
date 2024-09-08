package com.anodos.contactms.domain.entity;

public class Contact {

    private Long id;
    private String name;
    private String email;
    private Address address;
    private Phone phone;

    public Contact(final Long id, final String name, final Email email, final Address address, final Phone phone) {
        this.id = id;
        this.name = name;
        this.email = email.getAddress();
        this.address = address;
        this.phone = phone;
    }


    public Contact(final String name, final Email email, final Address address, final Phone phone) {
        this.name = name;
        this.email = email.getAddress();
        this.address = address;
        this.phone = phone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Phone getPhone() {
        return phone;
    }

    public void setPhone(Phone phone) {
        this.phone = phone;
    }
}
