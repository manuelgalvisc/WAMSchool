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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wamschool.backend.dto.ObjetoAprendizajeDTO;
import com.wamschool.backend.dto.SeccionDTO;
import com.wamschool.backend.model.ObjetoAprendizaje;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.services.ObjetoAprendizajeServices;
import com.wamschool.backend.services.SeccionServices;
import com.wamschool.backend.servicesImpl.UtilidadesServicesImpl;

/** 
 * Esta clase permite manejar los servicios relacionados a con seccion
 * @author WamSchool
 * @version 1.0
*/
@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/seccion")
public class SeccionController {
	
	@Autowired
	ObjetoAprendizajeServices oaservice;
	@Autowired
	SeccionServices sservice;
	
	/**
	 * Metodo que permite crear una seccion en la base de datos 
	 * @param seccion seccion que se quiere crear
	 * @param idOA objeto de aprendizaje al cual pertennecera dicha seccion
	 * @return 
	 */
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@PostMapping("/crearSeccion")
	public ResponseEntity<?> crearSeccion(@RequestBody Seccion seccion, @RequestParam Long idOA) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (seccion != null && idOA != null) {
				ObjetoAprendizaje oa = oaservice.buscarObjetoAprendizaje(idOA);
				if (oa != null) {
					seccion.setObjetoAprendizaje(oa);
					if (oa.getSecciones().isEmpty()) {
						seccion.setPosInOA(0);
					} else {
						seccion.setPosInOA(oa.getSecciones().size());
					}
					Seccion creada = sservice.crearSeccion(seccion);
					if (creada != null) {
						response.put("data", transformarSeccionADTO(creada));
						response.put("mensaje", "Se creo la sección satisfactoriamente");
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
					}
				}
			}
		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error creando la seccion");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error creando la seccion");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Metodo que listara todas las secciones pertenecientes a un objeto de aprendizaje respectivo
	 * @param idOA referencia del objeto de aprendizaje
	 * @return
	 */
	@GetMapping("/listarSeccionesOA")
	public ResponseEntity<?> listarSecciones(@RequestParam Long idOA) {
		Map<String, Object> response = new HashMap<>();
		try {
			if(idOA != null) {
				List<Seccion> secciones = sservice.listarSeccionesPorOA(idOA);
				if(secciones != null && !secciones.isEmpty()) {
					List<SeccionDTO> listaSeccionEnviar = new ArrayList<>();
						secciones.forEach((p)->{
						listaSeccionEnviar.add(transformarSeccionADTO(p));
					});
					response.put("data", listaSeccionEnviar);
					response.put("mensaje", "Se ha listado satisfactoriamente las secciones para este o");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}
			}
			
		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error listando las secciones para el OA");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error listando las secciones para el OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Metodo que permite buscar una seccion por medio de un identificador
	 * @param idSeccion identificador de seccion
	 * @return
	 */
	@GetMapping("/buscarSeccion")
	public ResponseEntity<?>buscarSeccion(@RequestParam Long idSeccion){
		Map<String, Object> response = new HashMap<>();
		try {
			Seccion seccionEnviar;
			if (idSeccion != null) {
				seccionEnviar=sservice.buscarPorId(idSeccion);
				if(seccionEnviar !=null) {
					response.put("data", transformarSeccionADTO(seccionEnviar));
					response.put("mensaje", "Se encontro una seccion ");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}else {
					response.put("data", null);
					response.put("mensaje", "no existe una seccion con este identificador");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
				}
			}else {
				response.put("data", null);
				response.put("mensaje", "Se presento un error buscando la seccion idseccion nulo");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
			}
				
			
			
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();		
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error listando las secciones para el OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		
	}


	/**
	 * Metodo que permite transformar una entidad del tipo seccion a una clase DTO seccion 
	 * @param seccion entidad que se quiere trasnformar
	 * @return seccionDTO
	 */
	private SeccionDTO transformarSeccionADTO(Seccion seccion) {
		
		SeccionDTO seccionDTO = new SeccionDTO();
		seccionDTO.setIdSeccion(seccion.getId());
		seccionDTO.setDescripcion(seccion.getDescripcion());
		seccionDTO.setNombreSeccion(seccion.getNombreSeccion());
		seccionDTO.setPosInOA(seccion.getPosInOA());
		seccionDTO.setIdOA(seccion.getObjetoAprendizaje().getId());
		return seccionDTO;
	}
	
}
