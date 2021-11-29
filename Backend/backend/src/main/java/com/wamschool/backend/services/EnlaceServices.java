package com.wamschool.backend.services;

import java.util.List;

import com.wamschool.backend.model.Enlace;

public interface EnlaceServices {
	public List<Enlace>listarPorId(Long idPagina);
	public Enlace guardarEnlace(Enlace enlace);
	public Enlace buscarPorId(Long idEnlace);
}
