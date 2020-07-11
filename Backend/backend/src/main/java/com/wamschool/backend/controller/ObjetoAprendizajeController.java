package com.wamschool.backend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.ObjetoAprendizaje;
import com.wamschool.backend.services.ObjetoAprendizajeServices;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ObjetoAprendizajeController {

	@Autowired
	ObjetoAprendizajeServices service;
	
	@PostMapping("/crearOA")
	public ResponseEntity<?> signIn(@RequestBody ObjetoAprendizaje oa){
		Map<String, Object> response = new HashMap<>();
		try {
			if(oa != null) {
				ObjetoAprendizaje oainput = (ObjetoAprendizaje)oa.clone();
				if(oainput != null) {
					List<Categoria> categorias = oa.getCategorias();
					oainput.setCategorias(null);
					ObjetoAprendizaje actual = service.crearObjetoAprendizaje(oainput);
					if(actual != null) {
						List<Categoria> categoriasReales = new ArrayList<Categoria>();
						for(Categoria cat: categorias) {
							Categoria aux = service.extraerCategoria(cat.getNombre());
							if(aux != null) {
								categoriasReales.add(aux);
							}
						}
						actual.setCategorias(categoriasReales);
						oainput = service.crearObjetoAprendizaje(actual);
						response.put("data",oainput);
						response.put("Se ha creado el OA correctamente", categoriasReales);
						return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
					}
				}
			}

		}catch(DataAccessException ex) {
			response.put("data",null);
			response.put("mensaje","Se presento un error creando el OA");
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		//creamos el json token 
		response.put("data",null);
		response.put("mensaje","Se presento un error creando el OA");
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
	}
	
	
}
