package com.wamschool.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wamschool.backend.dto.EnlaceDTO;
import com.wamschool.backend.model.Enlace;
import com.wamschool.backend.model.Pagina;
import com.wamschool.backend.services.EnlaceServices;
import com.wamschool.backend.services.PaginaServices;



/**
 * Clase que permite implementar los metodos concernientes con el manejo de enlaces de youtube
 * @author WamSchool
 * @version 1.0 
 */

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/enlace")
public class EnlaceController {
	
	@Autowired
	EnlaceServices enlaceServices;
	@Autowired
	PaginaServices paginaServices;
	
	/**
	 * Metodo que permite crear un enlace en la base de datos 
	 * @param enlace enlace que se guardara
	 * @param idPagina pagina a la cual pertenecera este enlace
	 * @return
	 */
	@PostMapping("/crearEnlace")
	public ResponseEntity<?>guardarEnlace(@RequestBody Enlace enlace, @RequestParam Long idPagina){
		Map<String, Object> response = new HashMap<>();
		try {
			if(enlace !=null && idPagina != null) {
				Pagina pagina =  paginaServices.buscarPorIdPagina(idPagina);
				if(pagina !=null) {
					enlace.setPagina(pagina);
					Enlace enlaceCreado = enlaceServices.guardarEnlace(enlace);
					if(enlaceCreado != null) {
						response.put("data", trasnformarEnlaceADTO(enlaceCreado));
						response.put("mensage", "enlace creado con exito");
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
					}
				}
			}
		} catch (DataAccessException da) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error de acceso a la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);	
	    }catch (Exception e) {
	    	e.printStackTrace();
			e.getCause();
	    }
			
		response.put("data", null);
		response.put("mensaje", "Se presento un error creando el enlace");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
		
	}
	
	
	/**
	 * Metodo que permite listar todos los enlaces que petenecen a una respectiva pagina
	 * @param idPagina pagina de los enlaces
	 * @return
	 */
	@GetMapping("/listarEnlaces")
	public ResponseEntity<?> listarEnlaces(@RequestParam Long idPagina) {
		Map<String, Object> response = new HashMap<>();

		try {
			if (idPagina != null) {
				List<Enlace> listaEnlaces = enlaceServices.listarPorId(idPagina);
				if (listaEnlaces != null && !listaEnlaces.isEmpty()) {
					List<EnlaceDTO> listaEnviar = new ArrayList<>();
					listaEnlaces.forEach((p) -> {
						listaEnviar.add(trasnformarEnlaceADTO(p));
					});
					response.put("data", listaEnviar);
					response.put("mensaje", "Se ha listado satisfactoriamente los enlaces");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}else {
					response.put("data", null);
					response.put("mensaje", "no existen enlaces para esta pagina");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}

		response.put("data", null);
		response.put("mensaje", "Se presento un error listando los enlaces");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	
	/**
	 * Metodo que permite trasnformar una entidad del tipo Enlace a una clase DTO del tipo enlaceDTO 
	 * @param enlace enlace que sera trasnformado
	 * @return enlaceDTO enlace que sera enviado al fronted
	 */
	public EnlaceDTO trasnformarEnlaceADTO(Enlace enlace){
		
		EnlaceDTO enlaceDTO = new EnlaceDTO();
		enlaceDTO.setId(enlace.getId());
		enlaceDTO.setNombre(enlace.getNombre());
		enlaceDTO.setUrl(enlace.getUrl());
		enlaceDTO.setIdPagina(enlace.getPagina().getId());
		
		return enlaceDTO;
	}
	
	
	
}
