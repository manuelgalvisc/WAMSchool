package com.wamschool.backend.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.ActividadCuestionario;
import com.wamschool.backend.repository.IActividadCuestionario;
import com.wamschool.backend.services.ActividadCuestionarioServices;

@Service
public class ActividadCuestionarioServicesImpl implements ActividadCuestionarioServices {

	@Autowired
	IActividadCuestionario actividadRepo;
	
	@Override
	public ActividadCuestionario crear(ActividadCuestionario actividadCuestionario) {
		return actividadRepo.save(actividadCuestionario);
	}

	
}
