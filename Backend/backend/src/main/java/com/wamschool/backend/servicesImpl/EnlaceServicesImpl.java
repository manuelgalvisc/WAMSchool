package com.wamschool.backend.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Enlace;
import com.wamschool.backend.repository.IEnlace;
import com.wamschool.backend.services.EnlaceServices;

@Service
public class EnlaceServicesImpl implements EnlaceServices{

	@Autowired
	IEnlace EnlaceRepo;
	@Override
	public List<Enlace> listarPorId(Long idPagina) {
		
		return EnlaceRepo.listarArchivosPorIdPagina(idPagina);
	}

	@Override
	public Enlace guardarEnlace(Enlace enlace) {
		
		return EnlaceRepo.save(enlace);
	}

	@Override
	public Enlace buscarPorId(Long idEnlace) {
		
		return EnlaceRepo.findById(idEnlace).orElse(null);
	}

}
