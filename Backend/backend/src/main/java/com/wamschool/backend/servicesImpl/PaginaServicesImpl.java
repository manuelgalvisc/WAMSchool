package com.wamschool.backend.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Pagina;
import com.wamschool.backend.repository.IPagina;
import com.wamschool.backend.services.PaginaServices;

@Service
public class PaginaServicesImpl implements PaginaServices{
	
	@Autowired
	IPagina paginaRepo;

	@Override
	public Pagina crearPagina(Pagina pagina) {
		return paginaRepo.save(pagina);
	}

	@Override
	public List<Pagina> listarPaginas(Long idSeccion) {
		
		return paginaRepo.listarPaginasPorSeccion(idSeccion);
	}

	@Override
	public Pagina buscarPorIdPagina(Long idPagina) {
		return paginaRepo.findById(idPagina).orElse(null);
	}

	

}
