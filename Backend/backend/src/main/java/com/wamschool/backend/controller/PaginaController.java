package com.wamschool.backend.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wamschool.backend.dto.PaginaDTO;
import com.wamschool.backend.model.Pagina;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.model.TipoPaginas;
import com.wamschool.backend.services.PaginaServices;
import com.wamschool.backend.services.SeccionServices;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/pagina")
public class PaginaController {

	@Autowired
	PaginaServices paginaServices;
	@Autowired
	SeccionServices sservice;

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
