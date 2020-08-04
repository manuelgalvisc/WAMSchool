package com.wamschool.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wamschool.backend.model.Role;
import com.wamschool.backend.model.Roles;
import com.wamschool.backend.model.Usuario;
import com.wamschool.backend.services.LoginServices;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/login")
public class LoginController {
	
	@Autowired
	LoginServices servicio;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Secured("ROLE_ADMIN")
	@PostMapping("/crearRole")
	public void crearRoles(Long tipo) {
		
		Role role = new Role();
		if(tipo == 1) {
			role.setName(Roles.ROLE_ADMIN.toString());
		}else if(tipo == 2) {
			role.setName(Roles.ROLE_USER.toString());
		}
		servicio.agregarRole(role);;
	}
	
	@PostMapping("/registrarUsuario")
	public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
		
		Map<String, Object> response = new HashMap<>();
		try {			
			if(usuario != null && usuario.getEmail() != null) {
				if(!servicio.containsEmailUser(usuario.getEmail())) {
					usuario.setPassword(this.passwordEncoder.encode(usuario.getPassword()));
					usuario.setEnabled(true);
					Usuario user = servicio.registrarUsuario(usuario);
					if(user != null) {
						//le agregamos el rol de usuario
						Role role = servicio.extraerRole(Roles.ROLE_USER.toString());
						if(role != null) {
							List<Role> roles = new ArrayList<Role>();
							roles.add(role);
							usuario.setRoles(roles);
							user.setRoles(roles);	
							servicio.registrarUsuario(user);
							//creamos el json token 
							response.put("data","token");
							response.put("mensaje","Se ha registrado el usuario Exitosamente!");
							return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
						}
					}
				}else {
					//el email ya se encuentra registrado en la DB 
					response.put("data",null);
					response.put("mensaje","El email ya se encuentra registrado");
					return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
				}
				
			}
					
		}catch(DataAccessException e) {
			response.put("data",null);
			response.put("mensaje","Error en la DB");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
			response.put("data","token");
			response.put("mensaje","Problemas con los datos enviados");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CONFLICT);
	}
	
}
