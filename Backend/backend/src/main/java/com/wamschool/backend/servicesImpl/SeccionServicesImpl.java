package com.wamschool.backend.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.repository.ISeccion;
import com.wamschool.backend.services.SeccionServices;

@Service
public class SeccionServicesImpl implements SeccionServices {
	
	@Autowired
	ISeccion repoSeccion;
	
	@Override
	
	public Seccion crearSeccion(Seccion seccion) {
		Seccion se = null;
		se = repoSeccion.save(seccion);
		return se;
	}

	@Override
	public List<Seccion> listarSeccionesPorOA(Long idOA) {
		
		return repoSeccion.listarSeccionesPorIdOA(idOA);
	}

	@Override
	public Seccion buscarPorId(Long idSeccion) {
		
		return repoSeccion.findById(idSeccion).orElse(null);
	}

}
