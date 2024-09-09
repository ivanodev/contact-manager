package com.anodos.contact_ms.domain.entity;

import com.anodos.contact_ms.domain.exception.BadRequestException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class EmailTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @DisplayName("Should create a valid new email instance")
    void shouldCreateValidNewEmailInstance() {

        var email = new Email("email@email.com");
        assertNotNull(email);
        assertEquals("email@email.com", email.getAddress());
    }

    @Test
    @DisplayName("Should throw BadRequestException when invalid email")
    void shouldThrowBadRequestException_WhenInvalidEmail() {

        assertThrows(BadRequestException.class, () -> {
            new Email("email@email.c");
        });
    }
}