package com.example.form.Register.Repository;

import com.example.form.Register.Entity.Notifcation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepo extends JpaRepository<Notifcation, Integer> {

}
