package com.example.form.Register.Entity;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Reply {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String reply;

}
