package com.example.form.Register.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Notifcation {
@Id
private int id;
@Column(columnDefinition = "LONGTEXT")
private String notification;
@Column(columnDefinition = "LONGTEXT")
private String email;



}
