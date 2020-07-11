package com.wamschool.backend.servicesImpl;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Role;
import com.wamschool.backend.model.Usuario;
import com.wamschool.backend.repository.IRole;
import com.wamschool.backend.repository.IUsuario;
import com.wamschool.backend.services.LoginServices;

@Service
public class LoginServicesImpl implements LoginServices {

	@Autowired
	IRole roleRepo;
	@Autowired
	IUsuario usuRepo;
	
	@Override
	@Transactional
	public void agregarRole(Role role) {
		roleRepo.save(role);
	}

	@Override
	@Transactional
	public Usuario registrarUsuario(Usuario user) {
		
		if(!usuRepo.existsUsuarioByEmail(user.getEmail())) {
			return usuRepo.save(user);
		}
		
		return null; 
	}

	@Override
	@Transactional
	public Usuario autenticarUsuario(String email) {
		return usuRepo.findByEmail(email);
	}

	@Override
	@Transactional(readOnly = true)
	public Role extraerRole(String name) {
		
		return roleRepo.findByName(name);
	}

	
}
