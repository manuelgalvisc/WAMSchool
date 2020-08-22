package com.wamschool.backend.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Ahorcado;
import com.wamschool.backend.repository.IAhorcado;
import com.wamschool.backend.services.AhorcadoServices;

@Service
public class AhorcadoServicesImpl implements AhorcadoServices{

	@Autowired
	IAhorcado ahorcadoRepo;
	

	@Override
	public Ahorcado guardarAhorcado(Ahorcado ahorcado) {
		
		return ahorcadoRepo.save(ahorcado);
	}

	@Override
	public Ahorcado buscarAhorcado(Long idAhorcado) {
		
		return ahorcadoRepo.findById(idAhorcado).orElse(null);
	}

	@Override
	public List<Ahorcado> listarAhorcadosPorIdSeccion(Long idSeccion) {
		return ahorcadoRepo.listarAhorcadosPorIdSeccion(idSeccion);
	}

}
