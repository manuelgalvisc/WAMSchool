package com.wamschool.backend.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Archivo;
import com.wamschool.backend.repository.IArchivo;
import com.wamschool.backend.services.ArchivoServices;

@Service
public class ArchivoServicesImpl implements ArchivoServices{

	
	@Autowired
	IArchivo archivoRepo;

	@Override
	public Archivo crearArchivo(Archivo archivo) {
		return archivoRepo.save(archivo);
	}

	

	@Override
	public Archivo buscarArchivoPorId(Long idArchivo) {
		
		return archivoRepo.findById(idArchivo).orElse(null);
	}



	@Override
	public List<Archivo> listarArchivosPorIdPagina(Long idPagina) {
		
		return archivoRepo.listarArchivosPorIdPagina(idPagina);
	}

	
	
	
	

}
