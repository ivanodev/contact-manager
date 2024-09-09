package com.anodos.contact_ms.infra.database.repository.database;

import com.anodos.contact_ms.domain.entity.Address;
import com.anodos.contact_ms.domain.entity.Contact;
import com.anodos.contact_ms.domain.entity.Email;
import com.anodos.contact_ms.domain.entity.Phone;
import com.anodos.contact_ms.domain.exception.DataBasePersistenceException;
import com.anodos.contact_ms.domain.repository.ContactRepository;
import com.anodos.contact_ms.infra.database.model.AddressModel;
import com.anodos.contact_ms.infra.database.model.ContactModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


public class DBContactRepository implements ContactRepository {


    private JPAContactRepository jpaContactRepository;

    private JPAAddressRepository jpaAddressRepository;

    public DBContactRepository(final JPAContactRepository jpaContactRepository,
                               final JPAAddressRepository jpaAddressRepository) {
        this.jpaAddressRepository = jpaAddressRepository;
        this.jpaContactRepository = jpaContactRepository;
    }

    @Override
    public Contact save(final Contact contact) {

        final ContactModel contactModel = this.parseContactModel(contact);
        final ContactModel contactSaved;
        try {
            contactSaved = this.jpaContactRepository.save(contactModel);
        } catch (Exception e) {
            throw new DataBasePersistenceException("contacts", e.getMessage());
        }

        final AddressModel addressModel = this.parseAddressModel(contact.getAddress(), contactSaved.getId());

        final AddressModel addressSaved;
        try {
            addressSaved = this.jpaAddressRepository.save(addressModel);
        } catch (Exception e) {
            this.jpaContactRepository.deleteById(contactSaved.getId());
            throw new DataBasePersistenceException("addresses", e.getMessage());
        }

        return this.parseContactEntity(contactSaved, addressSaved);
    }

    @Override
    public List<Contact> findAll() {

        final List<AddressModel> addressModels = this.jpaAddressRepository.findAll();
        final List<ContactModel> contactModels = this.jpaContactRepository.findAll();

        Map<UUID, AddressModel> addressMap = addressModels.stream()
                .collect(Collectors.toMap(AddressModel::getContactId, addressModel -> addressModel));

        return contactModels.stream()
                .map(contactModel -> {
                    AddressModel addressModel = addressMap.get(contactModel.getId());
                    return addressModel != null ? this.parseContactEntity(contactModel, addressModel) : null;
                })
                .filter(contact -> contact != null)
                .toList();
    }

    @Override
    public List<Contact> findByPage(Integer page, Integer size) {

        final Pageable pageable = PageRequest.of(page, size);
        final Page<ContactModel> contactPage = this.jpaContactRepository.findAll(pageable);

        return contactPage.stream()
                .map(contactModel -> {
                    AddressModel addressModel = this.jpaAddressRepository.findByContactId(contactModel.getId());
                    return this.parseContactEntity(contactModel, addressModel);
                })
                .toList();
    }

    @Override
    public Contact findById(String contactId) {

        final Optional<ContactModel> contactModelOptional = this.jpaContactRepository.findById(UUID.fromString(contactId));
        if (contactModelOptional.isEmpty()) return null;

        final ContactModel contactModel = contactModelOptional.get();
        final AddressModel addressModel = this.jpaAddressRepository.findByContactId(contactModel.getId());
        return this.parseContactEntity(contactModel, addressModel);
    }

    @Override
    public void deleteById(final String contactId) {

        this.jpaAddressRepository.deleteByContactId(UUID.fromString(contactId));
        this.jpaContactRepository.deleteById(UUID.fromString(contactId));
    }

    @Override
    public boolean emailExists(String email) {
        return this.jpaContactRepository.existsByEmail(email);
    }

    private ContactModel parseContactModel(final Contact contact) {

        final UUID contactId = contact.getId() != null ? UUID.fromString(contact.getId()) : null;

        return new ContactModel(
                contactId,
                contact.getName(),
                contact.getEmail(),
                contact.getPhone()
        );
    }

    private Contact parseContactEntity(final ContactModel contactModel, final AddressModel addressModel) {

        final Email email = new Email(contactModel.getEmail());
        final String fullPhone = contactModel.getPhone();

        String countryCode = fullPhone.substring(0, 2);
        String areaCode = fullPhone.substring(2, 4);
        String phoneNumber = fullPhone.substring(4);
        final Phone phone = new Phone(countryCode, areaCode, phoneNumber);
        final Address address = this.parseAddressEntity(addressModel);

        return new Contact(
                contactModel.getId().toString(),
                contactModel.getName(),
                email,
                address,
                phone
        );
    }

    private AddressModel parseAddressModel(final Address address, final UUID contactId) {

        final UUID addressId = address.getId() != null ? UUID.fromString(address.getId()) : null;

        return new AddressModel(
                addressId,
                contactId,
                address.getStreet(),
                address.getNumber(),
                address.getCity(),
                address.getState(),
                address.getPostalCode(),
                address.getCountry()
        );
    }

    private Address parseAddressEntity(final AddressModel addressModel) {

        final String addressId = addressModel.getId().toString();
        final String contactId = addressModel.getContactId().toString();

        return new Address(
                addressId,
                contactId,
                addressModel.getStreet(),
                addressModel.getNumber(),
                addressModel.getCity(),
                addressModel.getState(),
                addressModel.getPostalCode(),
                addressModel.getCountry()
        );
    }
}
