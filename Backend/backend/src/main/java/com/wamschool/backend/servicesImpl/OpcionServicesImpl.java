package com.wamschool.backend.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Opcion;
import com.wamschool.backend.repository.IOpcion;
import com.wamschool.backend.services.OpcionServices;

@Service
public class OpcionServicesImpl implements OpcionServices{

	@Autowired
	IOpcion opcionRepo;
	
	@Override
	public Opcion crearOpcion(Opcion opcion) {
		return opcionRepo.save(opcion);
	}
	
}
