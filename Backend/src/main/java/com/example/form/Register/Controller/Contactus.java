package com.example.form.Register.Controller;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Contactus {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String cname;

	private String cemail;
@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String message;
@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String replay;

	
}
