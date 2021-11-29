package com.wamschool.backend.services;

import java.util.List;

import com.wamschool.backend.model.Seccion;

public interface SeccionServices {
	
	public Seccion crearSeccion(Seccion seccion);
	public List<Seccion> listarSeccionesPorOA(Long idOA);
	public Seccion buscarPorId(Long idSeccion);
}
