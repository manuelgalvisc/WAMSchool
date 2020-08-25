package com.wamschool.backend.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wamschool.backend.model.ActividadEmparejamiento;
import com.wamschool.backend.model.ParejaItem;
import com.wamschool.backend.repository.IActividadEmparejamiento;
import com.wamschool.backend.repository.IParejaItem;
import com.wamschool.backend.services.ActividadEmparejamientoServices;

/**
 * Implementacion de los servicios descritos en Actividad Emparejamientoservices
 * @author acer
 *
 */
@Service
public class ActividadEmparejamientoServicesImpl implements ActividadEmparejamientoServices {

	@Autowired
	IActividadEmparejamiento repoACT;
	
	@Autowired
	IParejaItem repoPareja;
	
	@Override
	@Transactional
	public ParejaItem crearParejaItem(ParejaItem parejaItem) {
		
		return repoPareja.save(parejaItem); 
	}

	@Override
	@Transactional
	public ActividadEmparejamiento crearActividadEmparejamiento(ActividadEmparejamiento actividadEmparejamiento) {
		
		return repoACT.save(actividadEmparejamiento);
	}

	
}
