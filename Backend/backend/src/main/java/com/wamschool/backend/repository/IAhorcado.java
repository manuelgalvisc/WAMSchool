package com.wamschool.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.wamschool.backend.model.Ahorcado;


public interface IAhorcado extends CrudRepository<Ahorcado,Long>{
	@Query("Select ar from Ahorcado ar join fetch ar.seccion s where s.id =:idSeccion ")
	List<Ahorcado> listarAhorcadosPorIdSeccion(Long idSeccion);
	
}
