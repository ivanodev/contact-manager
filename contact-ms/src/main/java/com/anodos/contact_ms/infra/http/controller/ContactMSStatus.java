package com.anodos.contact_ms.infra.http.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/anodos/contact-manager/contacts")
public class ContactMSStatus {

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "Ânodos Global Application - Contact MS");
        response.put("status", "up");
        response.put("httpStatus", HttpStatus.OK.value());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
