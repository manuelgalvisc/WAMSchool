package com.wamschool.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	
	@PostMapping("/signin")
	public ResponseEntity<?> signIn(@RequestBody Usuario usuario) {
		
		Map<String, Object> response = new HashMap<>();
		try {
			if(!servicio.existeUsuario(usuario.getEmail())) {
				
				Usuario user = servicio.agregarUsuario(usuario);
				//le agregamos el rol de usuario
				Role role = servicio.extraerRole(Roles.ROLE_USER.toString());
				if(role != null) {
					List<Role> roles = new ArrayList<Role>();
					roles.add(role);
					usuario.setRoles(roles);
					user.setRoles(roles);	
					servicio.agregarUsuario(user);
				}
			}
		}catch(DataAccessException e) {
			response.put("mensaje","Error en la DB");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		//creamos el json token 
		response.put("data","token");
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
	}
	
}
