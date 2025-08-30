package com.example.form.Register.Entity;

import java.math.BigInteger;

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

public class ProfileUpdate {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column(columnDefinition = "LONGTEXT")
	private String image;
	private String aboutdoctor;
	private String doctorname;
	private BigInteger contact;
}