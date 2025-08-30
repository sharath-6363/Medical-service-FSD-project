package com.example.form.Register.Entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Service {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)

private int id;
private String service;
private String doctor;
private String hospital;
private String price;
private String description;
@Lob
@Column(columnDefinition = "LONGTEXT")
private String image;
private String Category;

}