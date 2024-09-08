package com.anodos.contact_ms.domain.entity;

import com.anodos.contact_ms.domain.exception.BadRequestException;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class PhoneTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @DisplayName("Should create a valid new phone instance")
    void shouldCreateValidNewPhoneInstance() {

        var phone = new Phone("55", "11", "998879988" );
        assertNotNull(phone);
    }

    @Test
    @DisplayName("Should throw BadRequestException when contains letter in PhoneNumber")
    void shouldThrowBadRequestException_WhenContainsLetterInPhoneNumber() {

        assertThrows(BadRequestException.class, () -> {
            new Phone("55", "11", "9988A9988");
        });
    }
}
