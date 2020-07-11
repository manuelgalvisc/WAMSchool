package com.wamschool.backend.repository;

import org.springframework.data.repository.CrudRepository;

import com.wamschool.backend.model.Categoria;

public interface ICategoria extends CrudRepository<Categoria,Long>{

	Categoria findBynombre(String name);
}
