package com.wamschool.backend.services;

import com.wamschool.backend.model.Role;
import com.wamschool.backend.model.Usuario;

public interface LoginServices {

	public void agregarRole(Role role);
	
	public Usuario autenticarUsuario(String email);
	
	public Usuario registrarUsuario(Usuario user);
	
	public Role extraerRole(String name);
	
	public Boolean containsEmailUser(String email);
}