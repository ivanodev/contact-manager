package com.anodos.contact_ms.application;

import com.anodos.contact_ms.domain.entity.Address;
import com.anodos.contact_ms.domain.entity.Contact;
import com.anodos.contact_ms.domain.entity.Email;
import com.anodos.contact_ms.domain.entity.Phone;
import com.anodos.contact_ms.domain.repository.ContactRepository;
import com.anodos.contact_ms.dto.AddressDTO;
import com.anodos.contact_ms.dto.ContactDTO;

public class ContactUpdate {

    private final ContactRepository contactRepository;

    public ContactUpdate(final ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public String execute(ContactDTO contactDTO) {

        final Contact contact = this.parseEntity(contactDTO);
        final Contact contactSaved = contactRepository.save(contact);
        return contactSaved.getId();
    }

    private Contact parseEntity(final ContactDTO contactDTO) {

        final Email email = new Email(contactDTO.getEmail());
        final Phone phone = Phone.fromFullPhoneNumber(contactDTO.getPhone());
        final AddressDTO addressDTO = contactDTO.getAddress();
        Address address = null;

        if (addressDTO != null) {
            address = new Address(
                    addressDTO.getId(),
                    addressDTO.getContactId(),
                    addressDTO.getStreet(),
                    addressDTO.getNumber(),
                    addressDTO.getCity(),
                    addressDTO.getState(),
                    addressDTO.getPostalCode(),
                    addressDTO.getCountry()
            );
        }

        return new Contact(
                contactDTO.getId(),
                contactDTO.getName(),
                email,
                address,
                phone
        );
    }
}
