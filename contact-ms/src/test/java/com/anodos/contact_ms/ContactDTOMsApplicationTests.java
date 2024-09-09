package com.anodos.contact_ms;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ContactDTOMsApplicationTests {

	@Test
	void test() {
		final int expected = 2;
		final int result = 1 + 1;
		Assertions.assertEquals(expected, result);
	}

}
