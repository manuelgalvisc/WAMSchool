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

import com.wamschool.backend.dto.ArchivoDTO;
import com.wamschool.backend.dto.PaginaDTO;
import com.wamschool.backend.model.Archivo;
import com.wamschool.backend.model.Pagina;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.services.PaginaServices;
import com.wamschool.backend.services.SeccionServices;


/** 
 * Esta clase permite manejar los servicios relacionados a con pagina
 * @author WamSchool
 * @version 1.0
*/
@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/pagina")
public class PaginaController {

	@Autowired
	PaginaServices paginaServices;
	@Autowired
	SeccionServices sservice;

	/**
	 * Metodo que permite crear una pagina en la base de datos
	 * @param pagina pagina que se desea crear 
	 * @param idSeccion seccion a la cual pertenecera esa pagina
	 * @return
	 */
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@PostMapping("/crearPagina")
	public ResponseEntity<?> crearPagina(@RequestBody Pagina pagina, @RequestParam Long idSeccion) {
		Map<String, Object> response = new HashMap<>();

		try {
			if (pagina != null && idSeccion != null) {
				Seccion sec = sservice.buscarPorId(idSeccion);
				if (sec != null) {
					pagina.setSeccion(sec);
					Pagina paginaCreada = paginaServices.crearPagina(pagina);
					if (paginaCreada != null) {
						response.put("data", transformarPaginaADTO(paginaCreada));
						response.put("mensage", "pagina creada con exito");
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
					}
				}
			}

		} catch (DataAccessException da) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error de acceso a la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);

		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error creando la pagina");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Metodo que permite listar las paginas que pertenecen a determinada seccion
	 * @param idSeccion seccion de la cual se quieren listar las paginas
	 * @return
	 */
	@GetMapping("/listarPaginas")
	public ResponseEntity<?>listarPaginas(@RequestParam Long idSeccion){
		Map<String, Object> response = new HashMap<>();
		try {
			if(idSeccion != null) {
				List<Pagina> listaPagina = paginaServices.listarPaginas(idSeccion);
				if(listaPagina != null && !listaPagina.isEmpty()) {
					List<PaginaDTO>listaEnviar = new ArrayList<>();
					listaPagina.forEach((p) ->{
						listaEnviar.add(transformarPaginaADTO(p));
					});
					response.put("data", listaEnviar);
					response.put("mensaje", "Se ha listado satisfactoriamente las paginas");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}else {
					response.put("data", null);
					response.put("mensaje", "no existen paginas para esta seccion");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}
				
			}
		
		} catch (DataAccessException da) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error de acceso a la base de datos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error listando las paginas");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Metodo que pemite transfornar una entidad del tipo pagina en una clase DTO 
	 * @param pagina entidad que se desea trasnformar
	 * @return PaginaDTO
	 */
	private PaginaDTO transformarPaginaADTO(Pagina pagina) {

		PaginaDTO paginaDTO = new PaginaDTO();
		paginaDTO.setIdPagina(pagina.getId());
		paginaDTO.setNombrePagina(pagina.getNombrePagina());
		paginaDTO.setContenidoPagina(pagina.getContenidoPagina());
		paginaDTO.setIdSeccion(pagina.getSeccion().getId());
		paginaDTO.setTipo(pagina.getTipo());

		return paginaDTO;
	}
}
