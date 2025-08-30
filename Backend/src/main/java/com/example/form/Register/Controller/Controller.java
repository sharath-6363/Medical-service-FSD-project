package com.example.form.Register.Controller;

import java.util.List;

import com.example.form.Register.Entity.*;
import com.example.form.Register.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin("*")
public class Controller {
//Register////
	@Autowired

	private Repository repo;

	@GetMapping("/Find")
	public List<Entity> getall() {
		return repo.findAll();
	}

	@PostMapping("/update")
	public String update(@RequestBody Entity obj) {
		repo.save(obj);
		return "Updated";
	}

	@DeleteMapping("/deletreg/{id}")
	public String delete(@PathVariable int id) {
		repo.deleteById(id);
		return "deleted";
	}

//User register\\\\
	@Autowired
	private UserRepo urepo;

	@PostMapping("/postulogin")
	public String postlogin(@RequestBody UserLogin obj) {
		urepo.save(obj);
		return "saved";
	}

//Service ////
	@Autowired
	private ServisRepo Servicerepo;

	@GetMapping("/getservice")
	public List<Service> getallservice() {
		return Servicerepo.findAll();
	}

	@PostMapping("/postService")
	public String postservice(@RequestBody Service obj) {
		Servicerepo.save(obj);
		return "Posted";
	}

	@PutMapping("updateService/{id}")
	public String putMethodName(@PathVariable String id, @RequestBody Service entity) {
		Servicerepo.save(entity);

		return "put";
	}

////cATEGORY///
	@Autowired
	public CatogaryRepo Ctrepo;

	@PostMapping("/postCato")

	public String postMethodName(@RequestBody Catagory entity) {
		Ctrepo.save(entity);

		return "save";
	}

	@GetMapping("/catogary")
	public List<Catagory> getcoto() {
		return Ctrepo.findAll();
	}

//Profile update////
	@Autowired
	private ProfileRepo profrepo;

	@GetMapping("/getprofile")
	public List<ProfileUpdate> getprofile() {
		return profrepo.findAll();
	}

	@PostMapping("/postProfile")
	public String postprofile(@RequestBody ProfileUpdate obj) {
		profrepo.save(obj);
		return "Posted";
	}

// Query page////
	@Autowired
	private QureyRepository Qrepo;

	@PostMapping("/UpdateQurey")
	public String updatequrey(@RequestBody Qurey obj) {
		Qrepo.save(obj);
		return "qurey seved";
	}

	@GetMapping("/FindQurey")
	public List<Qurey> findall() {
		return Qrepo.findAll();
	}

//
	@PutMapping("/updatereplay")
	public String update(@RequestBody Qurey abb) {
		Qrepo.save(abb);
		return "updated";
	}

	// ContactUs page////
	@Autowired

	public ContactusRepo crepo;

	@PostMapping("/postccus")
	public String postcontact(@RequestBody Contactus obj) {
		crepo.save(obj);
		return "Contactus seved";
	}

	@GetMapping("/getccus")
	public List<Contactus> getallccus() {
		return crepo.findAll();
	}

	@PutMapping("/putmessage")
	public String update(@RequestBody Contactus abb) {
		crepo.save(abb);
		return "updated";
	}
////Appoint Post\///

	@Autowired
	public appointmentRepository Aprepo;

	@PostMapping("/Appointment")
	public String postMethodName(@RequestBody Appointment obj) {
		Aprepo.save(obj);
		return "save";
	}

	@GetMapping("/getappoint")
	public List<Appointment> getMethodName() {
		return Aprepo.findAll();
	}

	@DeleteMapping("/deletmaping/{id}")
	public String deletemaping(@PathVariable int id) {
		Aprepo.deleteById(id);
		return "deleted";
	}

	@PutMapping("updateStatus/{id}")
	public String putMethodName(@PathVariable String id, @RequestBody Appointment entity) {
		Aprepo.save(entity);

		return "put ";
	}
	//// Notification//////

	@Autowired
	public NotificationRepo Nrepo;

	@GetMapping("/getnotify")
	public List<Notifcation> getnotify() {
		return Nrepo.findAll();
	}

	@PostMapping("/PostNotify")
	public String postMethodName(@RequestBody Notifcation entity) {
		Nrepo.save(entity);

		return "saved";
	}

	@DeleteMapping("/deletNot/{id}")
	public String deletenot(@PathVariable int id) {
		Nrepo.deleteById(id);
		return "deleted";
	}

////Update ////
	@Autowired
	public UpdateRepo Uprepo;

	@PutMapping("Updatedata")
	public String putMethodName( @RequestBody Update entity) {
		Uprepo.save(entity);

		return "put";
	}
	@GetMapping("getupdtae")
	public List<Update> getMethodName(@RequestBody String param) {
		return Uprepo.findAll();
	}
	

//Admin Log-in////
	@Autowired
	private AdminRepo adminrepo;

	@PostMapping("/adminsave")
	public ResponseEntity<?> userlogin(@RequestBody Adminlogin obj) {
		var admin = adminrepo.findByusername(obj.getUsername()).orElseThrow(() -> new RuntimeException("Admin not found"));
		if (admin.getPassword().equals(obj.getPassword())) {
			return new ResponseEntity<>("admin", HttpStatus.OK);
		} else {
			throw new RuntimeException("Invalid Password");
		}
	}

//Hospital Login//
	@PostMapping("/loginhospital")
	public ResponseEntity<?> hospitallogin(@RequestBody Entity obj) {
		var hospital = repo.findByemail(obj.getEmail()).orElseThrow(() -> new RuntimeException("user not found"));
		if (hospital.getPassword().equals(obj.getPassword())) {
			return new ResponseEntity<>(hospital, HttpStatus.OK);
		} else {
			throw new RuntimeException("Invalid Password");
		}
	}
	// User Login\\\\

	@PostMapping("/loginuser")
	public ResponseEntity<?> loginuser(@RequestBody UserLogin obj) {
		var Userlogin = urepo.findByuemail(obj.getUemail()).orElseThrow(() -> new RuntimeException("user not found"));
		if (Userlogin.getUpassword().equals(obj.getUpassword())) {
			return new ResponseEntity<>(Userlogin, HttpStatus.OK);
		} else {
			throw new RuntimeException("Invalid password");
		}
	}

}
