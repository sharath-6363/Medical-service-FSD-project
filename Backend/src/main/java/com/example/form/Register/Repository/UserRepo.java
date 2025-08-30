package com.example.form.Register.Repository;

import com.example.form.Register.Entity.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<UserLogin, Integer> {
    Optional<UserLogin> findByuemail(String uemail);
}
