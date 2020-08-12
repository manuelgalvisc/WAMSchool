package com.wamschool.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wamschool.backend.model.ActividadCuestionario;
import com.wamschool.backend.model.Enunciado;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.model.OpcionMultiple;
import com.wamschool.backend.model.PreguntaAbierta;
import com.wamschool.backend.model.Opcion;
import com.wamschool.backend.services.ActividadCuestionarioServices;
import com.wamschool.backend.services.EnunciadoServices;
import com.wamschool.backend.services.OpcionMultipleServices;
import com.wamschool.backend.services.OpcionServices;
import com.wamschool.backend.services.PreguntaAbiertaServices;
import com.wamschool.backend.services.SeccionServices;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/actividadCuestionario")
public class ActividadController {

	@Autowired
	ActividadCuestionarioServices service;
	@Autowired
	SeccionServices sservice;
	@Autowired
	OpcionMultipleServices omservice;
	@Autowired
	OpcionServices opservice;
	@Autowired
	PreguntaAbiertaServices paservice;
	@Autowired
	EnunciadoServices enunservice;
	
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@PostMapping("/crear")
	public ResponseEntity<?>crearActividadCuestionario(@RequestBody ActividadCuestionario actividad){
		Map<String, Object> response = new HashMap<>();
		try {
			if(actividad != null) {
				ActividadCuestionario actividadFinal = new ActividadCuestionario();
				actividadFinal.setIntroduccion(actividad.getIntroduccion());
				if(actividad.getSeccion()!= null && actividad.getSeccion().getId() != null) {
					Seccion seccion = sservice.buscarPorId(actividad.getSeccion().getId());
					actividadFinal.setSeccion(seccion);
					actividadFinal = service.crear(actividadFinal);
					if(actividad.getEnunciados() != null && actividad.getEnunciados().size() > 0) {
						List<Enunciado> enunciadosFinal = new ArrayList<Enunciado>();
						for(Enunciado enunciado:actividad.getEnunciados()){
							Enunciado enunciadoFinal = new Enunciado();
							enunciadoFinal.setEnunciado(enunciado.getEnunciado());
							enunservice.crear(enunciadoFinal);
							///OPCION MULTIPLE
							if(enunciado.getListaOpcionesMultiples() != null && enunciado.getListaOpcionesMultiples().size() > 0) {
								List<OpcionMultiple> opcionesMultiples = new ArrayList<OpcionMultiple>();
								for(OpcionMultiple opcionMultiple : enunciado.getListaOpcionesMultiples()){
									if(opcionMultiple.getOpciones()!= null && opcionMultiple.getOpciones().size() > 0) {
										OpcionMultiple opcionMultipleFinal = new OpcionMultiple();
										opcionMultipleFinal = omservice.crear(opcionMultipleFinal);
										List<Opcion>opcionesFinal = new ArrayList<Opcion>();
										for(Opcion opcion:opcionMultiple.getOpciones() ){
											if(opcion!=null) {
												opcion.setOpcionMultiple(opcionMultipleFinal);
												opcionesFinal.add(opservice.crearOpcion(opcion));
											}
										}
										opcionMultipleFinal.setOpciones(opcionesFinal);
										opcionMultipleFinal.setEnunciado(enunciadoFinal);
										opcionMultipleFinal = omservice.crear(opcionMultipleFinal);
										opcionesMultiples.add(opcionMultipleFinal);
									}
								}
								enunciado.setListaOpcionesMultiples(opcionesMultiples);
								enunservice.crear(enunciadoFinal);
							}
							//OPCION PREGUNTA ABIERTA
							if(enunciado.getListaPreguntasCompletar() != null && enunciado.getListaPreguntasCompletar().size() > 0) {
								List<PreguntaAbierta> preguntasAbiertas = new ArrayList<PreguntaAbierta>();
								for(PreguntaAbierta preguntaAbierta:enunciado.getListaPreguntasCompletar()) {
									if(preguntaAbierta != null) {
										preguntaAbierta.setEnunciado(enunciadoFinal);
										preguntasAbiertas.add(paservice.crear(preguntaAbierta));
									}
								}
								enunciadoFinal.setListaPreguntasCompletar(preguntasAbiertas);
								enunservice.crear(enunciadoFinal);
							}
							enunciadosFinal.add(enunciadoFinal);
						}
						actividadFinal.setEnunciados(enunciadosFinal);
						actividadFinal = service.crear(actividadFinal);
						response.put("data", actividadFinal);
						response.put("mensaje", "Se creo la Actividad Cuestionario satisfactoriamente");
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
					}
				}
			}
		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error creando la Actividad Cuestionario");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error creando la Actividad Cuestionario");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	
}
