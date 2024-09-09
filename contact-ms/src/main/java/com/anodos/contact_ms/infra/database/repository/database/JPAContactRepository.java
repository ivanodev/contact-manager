package com.anodos.contact_ms.infra.database.repository.database;

import com.anodos.contact_ms.infra.database.model.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JPAContactRepository extends JpaRepository<ContactModel, UUID> {

    boolean existsByEmail(String email);
}
