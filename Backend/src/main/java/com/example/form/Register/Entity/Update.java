package com.example.form.Register.Entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;

@Entity
@Table(name = "updateT")
public class Update {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String location;
private String contect;


}
