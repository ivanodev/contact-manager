package com.anodos.contact_ms.application;

import com.anodos.contact_ms.domain.entity.Address;
import com.anodos.contact_ms.domain.entity.Contact;
import com.anodos.contact_ms.domain.repository.ContactRepository;
import com.anodos.contact_ms.dto.AddressDTO;
import com.anodos.contact_ms.dto.ContactDTO;

import java.util.List;

public class ContactFetchById {

    private final ContactRepository contactRepository;

    public ContactFetchById(final ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactDTO execute(String contactId) {

        Contact contact = this.contactRepository.findById(contactId);

        if (contact == null) return null;

        final ContactDTO contactDTO = new ContactDTO();
        contactDTO.setId(contact.getId());
        contactDTO.setName(contact.getName());
        contactDTO.setEmail(contact.getEmail());
        contactDTO.setPhone(contact.getPhone());

        final Address address = contact.getAddress();

        if (address == null) return contactDTO;

        final AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(address.getId());
        addressDTO.setContactId(address.getContactId());
        addressDTO.setStreet(address.getStreet());
        addressDTO.setNumber(address.getNumber());
        addressDTO.setCity(address.getCity());
        addressDTO.setState(address.getState());
        addressDTO.setPostalCode(address.getPostalCode());
        addressDTO.setCountry(address.getCountry());

        contactDTO.setAddress(addressDTO);
        return contactDTO;
    }
}
