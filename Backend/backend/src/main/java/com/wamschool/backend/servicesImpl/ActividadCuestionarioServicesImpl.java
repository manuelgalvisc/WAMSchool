package com.wamschool.backend.servicesImpl;

import java.util.List;

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

	@Override
	public List<ActividadCuestionario> actividadesPorSeccion(Long Seccion) {
		return actividadRepo.findBySeccionCuestionarioId(Seccion);
	}

	@Override
	public ActividadCuestionario consultarPorId(Long id) {
		return actividadRepo.findById(id).get();
	}

	
}
