package com.anodos.contact_ms.infra.http.controller.database.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "addresses")
public class AddressModel {

    @Id
    @GeneratedValue(generator = "uuid2")
    //@GeneratedValue(strategy = GenerationType.UUID)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "contactId", nullable = false)
    private UUID contactId;

    @Column(name = "street", nullable = false, length = 255)
    private String street;

    @Column(name = "number", nullable = false, length = 10)
    private String number;

    @Column(name = "city", nullable = false, length = 50)
    private String city;

    @Column(name = "state", nullable = false, length = 50)
    private String state;

    @Column(name = "postal_code", nullable = false, length = 20)
    private String postalCode;

    @Column(name = "country", nullable = false, length = 150)
    private String country;

    public AddressModel(){}

    public AddressModel(final UUID id,
                        final UUID contactId,
                        final String street,
                        final String number,
                        final String city,
                        final String state,
                        final String postalCode,
                        final String country) {
        this.id = id;
        this.contactId = contactId;
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
    }

    public AddressModel(final String street,
                        final String number,
                        final UUID contactId,
                        final String city,
                        final String state,
                        final String postalCode,
                        final String country) {
        this.contactId = contactId;
        this.street = street;
        this.number = number;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getContactId() {
        return contactId;
    }

    public void setContactId(UUID contactId) {
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
}
