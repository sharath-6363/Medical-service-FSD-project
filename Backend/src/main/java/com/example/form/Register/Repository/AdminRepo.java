package com.example.form.Register.Repository;

import com.example.form.Register.Entity.Adminlogin;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepo extends  JpaRepository<Adminlogin, Integer>{
    Optional<Adminlogin> findByusername(String username);
}

