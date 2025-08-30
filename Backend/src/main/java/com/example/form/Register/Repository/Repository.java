package com.example.form.Register.Repository;

import com.example.form.Register.Entity.Entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


@org.springframework.stereotype.Repository

public interface Repository extends JpaRepository<Entity, Integer> {
    Optional<Entity> findByemail(String email);
}
