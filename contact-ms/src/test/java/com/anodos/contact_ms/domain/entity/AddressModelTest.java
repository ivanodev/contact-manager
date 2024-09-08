package com.anodos.contact_ms.domain.entity;

import org.junit.jupiter.api.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;


@ExtendWith(MockitoExtension.class)
class AddressModelTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @DisplayName("Should create a valid new address instance")
    void shouldCreateValidNewAddressInstance() {

        var address = new Address("Rua João da Silva", "São Paulo", "São Paulo", "09878-098", "Brasil", "");
        Assertions.assertNotNull(address);
    }
}