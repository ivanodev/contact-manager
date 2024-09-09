package com.anodos.contact_ms.infra.http.controller;

import com.anodos.contact_ms.application.*;
import com.anodos.contact_ms.domain.repository.ContactRepository;
import com.anodos.contact_ms.dto.ContactDTO;
import com.anodos.contact_ms.infra.database.repository.database.DBContactRepository;
import com.anodos.contact_ms.infra.database.repository.database.JPAAddressRepository;
import com.anodos.contact_ms.infra.database.repository.database.JPAContactRepository;
import com.anodos.contact_ms.infra.http.webclient.AuthWebClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/anodos/contact-manager/contacts")
public class ContactController {

    @Autowired
    private JPAContactRepository jpaContactRepository;
    @Autowired
    private JPAAddressRepository jpaAddressRepository;

    @Autowired
    private AuthWebClient authWebClient;

    @PostMapping("/new")
    public String saveContact(@RequestBody ContactDTO contactDTO,
                              @RequestHeader("Authorization") String authorization) {

        this.ensureAuthenticated(authorization);

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactRegister contactRegister = new ContactRegister(contactRepository);

        return contactRegister.execute(contactDTO);
    }

    @PutMapping("/update")
    public String updateContact(@RequestBody ContactDTO contactDTO,
                                @RequestHeader("Authorization") String authorization) {

        this.ensureAuthenticated(authorization);

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactUpdate contactUpdate = new ContactUpdate(contactRepository);

        return contactUpdate.execute(contactDTO);
    }

    @DeleteMapping("/delete/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable String contactId,
                                              @RequestHeader("Authorization") String authorization) {
        final String role = "admin";
        this.ensureAuthorization(authorization, role);

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactDelete contactDelete = new ContactDelete(contactRepository);
        contactDelete.execute(contactId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/find-all")
    public List<ContactDTO> findAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int limit,
                                    @RequestHeader("Authorization") String authorization) {

        this.ensureAuthenticated(authorization);

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactFetchAll contactFetchAll = new ContactFetchAll(contactRepository);
        return contactFetchAll.execute(page, limit);
    }

    @GetMapping("/find-id/{contactId}")
    public ResponseEntity<ContactDTO> findById(@PathVariable String contactId,
                                               @RequestHeader("Authorization") String authorization) {

        this.ensureAuthenticated(authorization);

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactFetchById contactFetchById = new ContactFetchById(contactRepository);
        final ContactDTO contactDTO = contactFetchById.execute(contactId);

        if (contactDTO == null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(contactDTO);
        }
    }

    private void ensureAuthenticated(final String authorization) {

        final Authentication authentication = new Authentication(authWebClient);
        authentication.isAuthenticated(authorization);
    }

    private void ensureAuthorization(final String authorization, final String role) {

        final Authentication authentication = new Authentication(authWebClient);
        authentication.isAuthorized(authorization, role);
    }
}
