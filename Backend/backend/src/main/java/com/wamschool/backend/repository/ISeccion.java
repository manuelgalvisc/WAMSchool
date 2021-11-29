package com.wamschool.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wamschool.backend.model.Seccion;

public interface ISeccion extends JpaRepository<Seccion,Long> {

	@Query("Select s from Seccion s join fetch s.objetoAprendizaje oa where oa.id =:idOA ")
	List<Seccion> listarSeccionesPorIdOA(Long idOA);
}
