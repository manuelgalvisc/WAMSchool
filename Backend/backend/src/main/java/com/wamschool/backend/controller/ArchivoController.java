package com.wamschool.backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.wamschool.backend.dto.ArchivoDTO;
import com.wamschool.backend.model.Archivo;
import com.wamschool.backend.model.Pagina;
import com.wamschool.backend.services.ArchivoServices;
import com.wamschool.backend.services.PaginaServices;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/archivo")
public class ArchivoController {
	
	@Autowired
	PaginaServices paginaServices;
	@Autowired
	ArchivoServices archivoServices;
	
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@PostMapping("/cargarArchivos")
	public ResponseEntity<?>cargarArchivo(@RequestParam("archivo") MultipartFile archivo, @RequestParam("idPagina") Long idPagina){
		String urlArchivo = "Archivos";
		Map<String, Object> response = new HashMap<>();
		if(archivo != null) {
			String nombreArchivo =  UUID.randomUUID().toString()+"_"+ archivo.getOriginalFilename().replace("", "");
			Path rutaArchivo = Paths.get(urlArchivo).resolve(nombreArchivo);
			
			try {
				Files.copy(archivo.getInputStream(), rutaArchivo );
				
			} catch (IOException e) {
				response.put("data", null);
				response.put("mensaje", "Se presento un error creando el archivo"+ e.getMessage());
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			}
			Pagina pagina = paginaServices.buscarPorIdPagina(idPagina);
			Archivo archivoCreado = new Archivo();
			archivoCreado.setNombre(nombreArchivo);
			archivoCreado.setUrl(rutaArchivo.toString());
			archivoCreado.setPagina(pagina);
			Archivo archivoGuardado = archivoServices.crearArchivo(archivoCreado);
			
			if(archivoGuardado != null) {
				response.put("data", archivoGuardado.getNombre());
				response.put("mensaje", "se creo el archivo satisfactoriamente");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}
			
			
		}
		
		response.put("data", null);
		response.put("mensaje", "Se presento un error creando el archivo");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/listarArchivos")
	public ResponseEntity<?> listarArchivos(@RequestParam Long idPagina){
		Map<String, Object> response = new HashMap<>();
		try {
			if(idPagina != null) {
				List<Archivo> listaArchivos = archivoServices.listarArchivosPorIdPagina(idPagina);
				if(listaArchivos != null && !listaArchivos.isEmpty()) {
					List<ArchivoDTO>listaEnviar = new ArrayList<>();
					listaArchivos.forEach((p) ->{
						listaEnviar.add(convertirArchivoToDTO(p));
					});
					response.put("data", listaEnviar);
					response.put("mensaje", "Se ha listado satisfactoriamente los archivos");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}else {
					response.put("data", null);
					response.put("mensaje", "no existen archivos para esta pagina");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}
				
			}
		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("mensaje", "Se ha producido un error a listar los archivos");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		
		response.put("data", null);
		response.put("mensaje", "Se presento un error listando las secciones para el OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	
	public ArchivoDTO convertirArchivoToDTO(Archivo archivo) {
		ArchivoDTO archivoDTO  = new ArchivoDTO();
		
		archivoDTO.setIdArchivo(archivo.getId());
		archivoDTO.setNombre(archivo.getNombre());
		archivoDTO.setUrl(archivo.getUrl());
		archivoDTO.setIdPagina(archivo.getPagina().getId());
		
		return archivoDTO;
		
	}
	
	
}

