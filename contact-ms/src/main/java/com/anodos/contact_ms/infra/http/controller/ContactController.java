package com.anodos.contact_ms.infra.http.controller;

import com.anodos.contact_ms.application.*;
import com.anodos.contact_ms.domain.exception.UnauthenticatedException;
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
    public String saveContact(@RequestBody ContactDTO contactDTO) {

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactRegister contactRegister = new ContactRegister(contactRepository);

        return contactRegister.execute(contactDTO);
    }

    @PutMapping("/update")
    public String updateContact(@RequestBody ContactDTO contactDTO) {

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactUpdate contactUpdate = new ContactUpdate(contactRepository);

        return contactUpdate.execute(contactDTO);
    }

    @DeleteMapping("/delete/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable String contactId,
                                              @RequestHeader("Authorization") String authorizatio) {

        final Authentication authentication = new Authentication(authWebClient);
        final String token = this.getTokenFromHeader(authorizatio);
        final String role = "admin";

        authentication.isAuthorized(token, role);

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactDelete contactDelete = new ContactDelete(contactRepository);
        contactDelete.execute(contactId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/find-all")
    public List<ContactDTO> findAll(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int limit) {

        final ContactRepository contactRepository = new DBContactRepository(
                jpaContactRepository, jpaAddressRepository
        );

        final ContactFetchAll contactFetchAll = new ContactFetchAll(contactRepository);
        return contactFetchAll.execute(page, limit);
    }

    @GetMapping("/find-id/{contactId}")
    public ResponseEntity<ContactDTO> findById(@PathVariable String contactId) {

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

    private String getTokenFromHeader(final String authorization) {
        if (authorization != null && authorization.startsWith("Bearer ")) {
            return authorization.substring(7);
        } else {
            throw new UnauthenticatedException("Invalid Authorization header");
        }
    }
}
