package com.anodos.contact_ms.infra.database.repository.database;

import com.anodos.contact_ms.infra.database.model.AddressModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface JPAAddressRepository extends JpaRepository<AddressModel, UUID> {

    AddressModel findByContactId(UUID contactId);

    @Transactional
    void deleteByContactId(UUID contactId);
}
