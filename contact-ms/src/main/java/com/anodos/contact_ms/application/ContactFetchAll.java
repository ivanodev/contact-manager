package com.anodos.contact_ms.application;

import com.anodos.contact_ms.domain.entity.Address;
import com.anodos.contact_ms.domain.entity.Contact;
import com.anodos.contact_ms.domain.repository.ContactRepository;
import com.anodos.contact_ms.dto.AddressDTO;
import com.anodos.contact_ms.dto.ContactDTO;

import java.util.ArrayList;
import java.util.List;

public class ContactFetchAll {

    private final ContactRepository contactRepository;

    public ContactFetchAll(final ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<ContactDTO> execute(Integer page, Integer size) {

        List<ContactDTO> contactDTOS = new ArrayList<>();

        List<Contact> contacts = this.contactRepository.findByPage(page, size);

        for (Contact contact: contacts) {

            final ContactDTO contactDTO = new ContactDTO();
            contactDTO.setId(contact.getId());
            contactDTO.setName(contact.getName());
            contactDTO.setEmail(contact.getEmail());
            contactDTO.setPhone(contact.getPhone());

            final Address address = contact.getAddress();

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
            contactDTOS.add(contactDTO);
        }

        return contactDTOS;

    }
}
