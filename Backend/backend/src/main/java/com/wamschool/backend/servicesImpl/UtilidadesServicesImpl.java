package com.wamschool.backend.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Usuario;
import com.wamschool.backend.repository.IUsuario;

@Service
public class UtilidadesServicesImpl {
	
	@Autowired
	IUsuario usuRepo;
	
	public Usuario buscarUsuarioPorEmail(String email) {
		Usuario user = null;
		user = usuRepo.findByEmail(email);
		return user;
	}
	
	
}
