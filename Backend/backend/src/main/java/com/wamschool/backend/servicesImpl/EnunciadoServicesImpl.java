package com.wamschool.backend.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Enunciado;
import com.wamschool.backend.repository.IEnunciado;
import com.wamschool.backend.services.EnunciadoServices;

@Service
public class EnunciadoServicesImpl implements EnunciadoServices {

	@Autowired
	IEnunciado enunRepo;

	@Override
	public Enunciado crear(Enunciado enunciado) {
		
		return enunRepo.save(enunciado);
	}
	
	
}
