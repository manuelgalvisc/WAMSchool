package com.wamschool.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.wamschool.backend.model.Role;

public interface IRole extends CrudRepository<Role,Long> {
	
	Role findByName(String nombre);
}
