package com.wamschool.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wamschool.backend.model.ActividadCuestionario;

public interface IActividadCuestionario extends JpaRepository<ActividadCuestionario,Long>{

	List<ActividadCuestionario> findBySeccionCuestionarioId(Long idSeccion);
}
