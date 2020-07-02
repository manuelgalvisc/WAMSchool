package com.wamschool.backend.services;

import com.wamschool.backend.model.Role;
import com.wamschool.backend.model.Usuario;

public interface LoginServices {

	public void agregarRole(Role role);
	
	public Boolean existeUsuario(String email);
	
	public Usuario agregarUsuario(Usuario user);
	
	public Role extraerRole(String name);
}