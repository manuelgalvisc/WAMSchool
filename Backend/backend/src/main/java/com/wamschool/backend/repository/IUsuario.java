package com.wamschool.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.wamschool.backend.model.Usuario;

public interface IUsuario extends CrudRepository<Usuario,Long> {
	
	Boolean existsUsuarioByEmail(String email);

}
