package com.anodos.contact_ms.domain.repository;

import com.anodos.contact_ms.domain.entity.Contact;

import java.util.List;
import java.util.UUID;

public interface ContactRepository {

    Contact save(Contact contact);
    List<Contact> findAll();
    List<Contact> findByPage(Integer page, Integer size);
    Contact findById(String contactId);
    void deleteById(String contactId);
    boolean emailExists(String email);
    boolean contactExists(String contactId);
    boolean existsByEmailAndIdNot(String email, String comtactId);
}
