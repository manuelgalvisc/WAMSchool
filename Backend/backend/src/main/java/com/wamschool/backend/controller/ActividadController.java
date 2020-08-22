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

import com.wamschool.backend.dto.ActividadCuestionarioDTO;
import com.wamschool.backend.dto.EnunciadoDTO;
import com.wamschool.backend.dto.OpcionDTO;
import com.wamschool.backend.dto.OpcionMultipleDTO;
import com.wamschool.backend.dto.PreguntaAbiertaDTO;
import com.wamschool.backend.dto.AhorcadoDTO;
import com.wamschool.backend.model.ActividadCuestionario;
import com.wamschool.backend.model.Ahorcado;
import com.wamschool.backend.model.Enunciado;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.model.OpcionMultiple;
import com.wamschool.backend.model.PreguntaAbierta;
import com.wamschool.backend.model.Opcion;
import com.wamschool.backend.services.ActividadCuestionarioServices;
import com.wamschool.backend.services.AhorcadoServices;
import com.wamschool.backend.services.EnunciadoServices;
import com.wamschool.backend.services.OpcionMultipleServices;
import com.wamschool.backend.services.OpcionServices;
import com.wamschool.backend.services.PreguntaAbiertaServices;
import com.wamschool.backend.services.SeccionServices;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/actividad")
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
	@Autowired
	AhorcadoServices ahorcadoServices;
	
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@PostMapping("/crearCuestionario")
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
						response.put("data", convertirCuestionarioADTO(actividadFinal));
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
	
	
	private ActividadCuestionarioDTO convertirCuestionarioADTO(ActividadCuestionario cuestionario){
		
		ActividadCuestionarioDTO cuestionarioDTO = new ActividadCuestionarioDTO();
		cuestionarioDTO.setId(cuestionario.getId());
		cuestionarioDTO.setIntroduccion(cuestionario.getIntroduccion());
		cuestionarioDTO.setSeccionCuestionario(cuestionario.getSeccion().getId());
		List<EnunciadoDTO>listaEnunciados = new ArrayList<EnunciadoDTO>();
		for(Enunciado enunciado: cuestionario.getEnunciados()) {
			EnunciadoDTO enunciadoDTO = new EnunciadoDTO();
			enunciadoDTO.setEnunciado(enunciado.getEnunciado());
			enunciadoDTO.setId(enunciado.getId());
			enunciadoDTO.setActividadCuestionario(cuestionario.getId());
			List<PreguntaAbiertaDTO>preguntasAbiertas = new ArrayList<PreguntaAbiertaDTO>();
			for(PreguntaAbierta preguntaAbierta:enunciado.getListaPreguntasCompletar()) {
				PreguntaAbiertaDTO preguntaAbiertaDTO = new PreguntaAbiertaDTO();
				preguntaAbiertaDTO.setEnunciadoPreguntaAbierta(enunciado.getId());
				preguntaAbiertaDTO.setId(preguntaAbierta.getId());
				preguntaAbiertaDTO.setPalabraARellenar(preguntaAbierta.getPalabraARellenar());
				preguntaAbiertaDTO.setTexto(preguntaAbierta.getTexto());
				preguntasAbiertas.add(preguntaAbiertaDTO);
			}
			enunciadoDTO.setListaPreguntasCompletar(preguntasAbiertas);
			List<OpcionMultipleDTO>opcionesMultiples = new ArrayList<OpcionMultipleDTO>();
			for(OpcionMultiple opcionMultiple : enunciado.getListaOpcionesMultiples()) {
				OpcionMultipleDTO opcionMultipleDTO = new OpcionMultipleDTO();
				opcionMultipleDTO.setId(opcionMultiple.getId());
				opcionMultipleDTO.setEnunciado(opcionMultiple.getEnunciado().getId());
				opcionMultipleDTO.setPregunta(opcionMultiple.getPregunta());
				List<OpcionDTO>opciones = new ArrayList<OpcionDTO>();
				for(Opcion opcion : opcionMultiple.getOpciones()) {
					OpcionDTO opcionDTO = new OpcionDTO();
					opcionDTO.setId(opcion.getId());
					opcionDTO.setOpcionMultiple(opcionMultiple.getId());
					opcionDTO.setOpcion(opcion.getOpcion());
					opcionDTO.setValor(opcion.getValor());
					opciones.add(opcionDTO);
				}
				opcionMultipleDTO.setOpciones(opciones);
				opcionesMultiples.add(opcionMultipleDTO);
			}
			enunciadoDTO.setListaOpcionesMultiples(opcionesMultiples);		
			listaEnunciados.add(enunciadoDTO);
		}
		cuestionarioDTO.setEnunciados(listaEnunciados);
		return cuestionarioDTO;
	}
	
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@PostMapping("/crearAhorcado")
	public ResponseEntity<?> crearAhorcado(@RequestBody Ahorcado ahorcado, @RequestParam Long idSeccion) {
		Map<String, Object> response = new HashMap<>();

		try {
			if (ahorcado != null && idSeccion != null) {
				Seccion sec = sservice.buscarPorId(idSeccion);
				if (sec != null) {
					ahorcado.setSeccion(sec);
					Ahorcado ahorcadoCreado = ahorcadoServices.guardarAhorcado(ahorcado);
					if (ahorcadoCreado != null) {
						response.put("data", transformarAhorcadoToDTO(ahorcadoCreado));
						response.put("mensage", "ahorcado creado con exito");
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
		response.put("mensaje", "Se presento un error creando el ahorcado");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	
	@GetMapping("/listarAhorcados")
	public ResponseEntity<?>listarAhorcados(@RequestParam Long idSeccion){
		Map<String, Object> response = new HashMap<>();
		try {
			if(idSeccion != null) {
				List<Ahorcado> listaAhorcados = ahorcadoServices.listarAhorcadosPorIdSeccion(idSeccion);
				if(listaAhorcados != null && !listaAhorcados.isEmpty()) {
					List<AhorcadoDTO>listaEnviar = new ArrayList<>();
					listaAhorcados.forEach((p) ->{
						listaEnviar.add(transformarAhorcadoToDTO(p));
					});
					response.put("data", listaEnviar);
					response.put("mensaje", "Se ha listado satisfactoriamente los ahorcados");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}else {
					response.put("data", null);
					response.put("mensaje", "no existen ahorcados para esta seccion");
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
		response.put("mensaje", "Se presento un error listando los ahorcados");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	public AhorcadoDTO transformarAhorcadoToDTO(Ahorcado ahorcado) {
		AhorcadoDTO ahorcadoDTO = new AhorcadoDTO();
		
		ahorcadoDTO.setId(ahorcado.getId());
		ahorcadoDTO.setPalabraOculta(ahorcado.getPalabraOculta());
		ahorcadoDTO.setIdSeccion(ahorcado.getSeccion().getId());
		
		return ahorcadoDTO;		
	}
	
	

	
}
