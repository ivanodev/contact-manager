package com.anodos.contact_ms.application;

import com.anodos.contact_ms.domain.exception.InternalServerErrorException;
import com.anodos.contact_ms.domain.repository.ContactRepository;

public class ContactDelete {

    private final ContactRepository contactRepository;

    public ContactDelete(final ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public void execute(String contactId) {

        try {
            contactRepository.deleteById(contactId);
        } catch (Exception e) {
            throw new InternalServerErrorException("Error deleting contact record - " + e.getMessage());
        }

    }
}
