package com.wamschool.backend.services;

import java.util.List;

import com.wamschool.backend.model.Pagina;

public interface PaginaServices {
	
	public Pagina crearPagina(Pagina pagina);
	public List<Pagina> listarPaginas(Long idSeccion);
	

}
