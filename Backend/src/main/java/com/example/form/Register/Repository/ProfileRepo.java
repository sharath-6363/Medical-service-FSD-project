 package com.example.form.Register.Repository;

import com.example.form.Register.Entity.ProfileUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProfileRepo extends JpaRepository<ProfileUpdate, Integer>{

}
