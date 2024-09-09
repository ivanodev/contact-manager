package com.anodos.contact_ms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
public class ContactMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContactMsApplication.class, args);
	}

}
