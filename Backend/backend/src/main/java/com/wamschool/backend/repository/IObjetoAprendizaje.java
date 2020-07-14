package com.wamschool.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.ObjetoAprendizaje;

public interface IObjetoAprendizaje extends JpaRepository<ObjetoAprendizaje,Long>{
	
	Page<ObjetoAprendizaje> findAllByCategoriasIn(List<Categoria> categorias,Pageable pageable);

//modo 2 para hacer lo mismo	
	@Query("Select oa from ObjetoAprendizaje oa join oa.categorias c where c in (:categorias)")
	Page<ObjetoAprendizaje> buscarPorCategorias_2(List<Categoria> categorias,Pageable pageable);
}
