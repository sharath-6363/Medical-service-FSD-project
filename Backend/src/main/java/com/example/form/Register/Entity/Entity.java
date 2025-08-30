package com.example.form.Register.Entity;

import java.math.BigInteger;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@jakarta.persistence.Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Entity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String email;
	private String Name;
	@Column(columnDefinition = "BIGINT")
	private BigInteger phone;
	private String Password;
}
