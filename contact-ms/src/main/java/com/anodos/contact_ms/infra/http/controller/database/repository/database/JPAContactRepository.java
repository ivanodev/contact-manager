package com.anodos.contact_ms.infra.http.controller.database.repository.database;

import com.anodos.contact_ms.infra.http.controller.database.model.ContactModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JPAContactRepository extends JpaRepository<ContactModel, UUID> {

}
