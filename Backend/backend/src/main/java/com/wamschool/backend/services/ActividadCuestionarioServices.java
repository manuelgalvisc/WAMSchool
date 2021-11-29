package com.wamschool.backend.services;

import java.util.List;

import com.wamschool.backend.model.ActividadCuestionario;

public interface ActividadCuestionarioServices {

	public ActividadCuestionario crear(ActividadCuestionario actividadCuestionario);
	
	public List<ActividadCuestionario> actividadesPorSeccion(Long Seccion);
	
	public ActividadCuestionario consultarPorId(Long id);
}
