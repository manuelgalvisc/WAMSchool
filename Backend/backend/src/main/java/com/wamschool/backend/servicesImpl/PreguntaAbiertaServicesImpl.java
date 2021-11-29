package com.wamschool.backend.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.PreguntaAbierta;
import com.wamschool.backend.repository.IPreguntaAbierta;
import com.wamschool.backend.services.PreguntaAbiertaServices;

@Service
public class PreguntaAbiertaServicesImpl implements PreguntaAbiertaServices{

	@Autowired
	IPreguntaAbierta pregAbiertaRepo;

	@Override
	public PreguntaAbierta crear(PreguntaAbierta preguntaAbierta) {
		
		return pregAbiertaRepo.save(preguntaAbierta);
	}
	
	
}
