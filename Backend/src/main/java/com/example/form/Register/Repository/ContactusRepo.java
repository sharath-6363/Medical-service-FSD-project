package com.example.form.Register.Repository;

import com.example.form.Register.Controller.Contactus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ContactusRepo extends JpaRepository<Contactus, Integer> {

}
