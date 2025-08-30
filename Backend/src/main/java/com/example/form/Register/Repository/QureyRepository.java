package com.example.form.Register.Repository;

import com.example.form.Register.Entity.Qurey;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface QureyRepository extends JpaRepository<Qurey, Integer> {
}
