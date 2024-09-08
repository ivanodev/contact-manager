package com.anodos.contact_ms.infra.http.controller.database.repository.database;

import com.anodos.contact_ms.infra.http.controller.database.model.AddressModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JPAAddressRepository extends JpaRepository<AddressModel, UUID> {

    AddressModel findByContactId(UUID contactId);
    void deleteByContactId(UUID contactId);
}
