package com.wamschool.backend.services;

import com.wamschool.backend.model.ActividadEmparejamiento;
import com.wamschool.backend.model.ParejaItem;

/**
 * Interface que descrive los servicios para el ietm de desarrollo de Actividad emparejamiento
 * @author acer
 *
 */
public interface ActividadEmparejamientoServices {
	
	ParejaItem crearParejaItem(ParejaItem parejaItem);
	
	ActividadEmparejamiento crearActividadEmparejamiento(ActividadEmparejamiento actividadEmparejamiento);
	

}
