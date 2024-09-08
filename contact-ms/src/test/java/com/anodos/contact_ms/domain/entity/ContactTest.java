package com.anodos.contact_ms.domain.entity;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@ExtendWith(MockitoExtension.class)
class ContactTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @DisplayName("Should create a valid new contact instance")
    void shouldCreateValidNewContactInstance() {

        var address = new Address("Rua João da Silva", "São Paulo", "São Paulo", "09878-098", "Brasil", "");
        var email = new Email("email@email.com");
        var phone = new Phone("55", "11", "998879988" );
        var contact = new Contact("Jhon Doe", email, address, phone);

        assertNotNull(contact);
        assertEquals("5511998879988", contact.getPhone());
        assertEquals("email@email.com", contact.getEmail());
    }

}