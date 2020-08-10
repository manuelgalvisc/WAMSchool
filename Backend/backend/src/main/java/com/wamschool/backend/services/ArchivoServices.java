package com.wamschool.backend.services;

import java.util.List;

import com.wamschool.backend.model.Archivo;

public interface ArchivoServices {
	public Archivo crearArchivo(Archivo archivo);
	public List<Archivo>listarArchivosPorIdPagina(Long idPagina);
	public Archivo buscarArchivoPorId(Long idArchivo);
}
