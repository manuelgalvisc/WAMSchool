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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wamschool.backend.dto.ActividadCuestionarioDTO;
import com.wamschool.backend.dto.ActividadEmparejamientoDTO;
import com.wamschool.backend.dto.EnunciadoDTO;
import com.wamschool.backend.dto.OpcionDTO;
import com.wamschool.backend.dto.OpcionMultipleDTO;
import com.wamschool.backend.dto.ParejaItemDTO;
import com.wamschool.backend.dto.PreguntaAbiertaDTO;
import com.wamschool.backend.dto.AhorcadoDTO;
import com.wamschool.backend.model.ActividadCuestionario;
import com.wamschool.backend.model.ActividadEmparejamiento;
import com.wamschool.backend.model.Ahorcado;
import com.wamschool.backend.model.Enunciado;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.model.OpcionMultiple;
import com.wamschool.backend.model.ParejaItem;
import com.wamschool.backend.model.PreguntaAbierta;
import com.wamschool.backend.model.Opcion;
import com.wamschool.backend.services.ActividadCuestionarioServices;
import com.wamschool.backend.services.ActividadEmparejamientoServices;
import com.wamschool.backend.services.AhorcadoServices;
import com.wamschool.backend.services.EnunciadoServices;
import com.wamschool.backend.services.OpcionMultipleServices;
import com.wamschool.backend.services.OpcionServices;
import com.wamschool.backend.services.PreguntaAbiertaServices;
import com.wamschool.backend.services.SeccionServices;


/** 
 * Esta clase permite manejar los servicios relacionados con actividad
 * @author WamSchool
 * @version 1.7 
*/


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
	@Autowired
	ActividadEmparejamientoServices emparejamientoServices;
	
	
	 

	/**
	 * Metodo que permite crear una actividad del tipo cuestionario en la base de datos
	 * @param actividad actividad que ingresa en forma de json 
	 * @param idSeccion seccion a la cual le asignaremos dicha actividad
	 * @return
	 */
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@Transactional(rollbackFor = {DataAccessException.class,Exception.class})
	@PostMapping("/crearCuestionario")
	public ResponseEntity<?> crearActividadCuestionario(@RequestBody ActividadCuestionario actividad,
			@RequestParam Long idSeccion) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (actividad != null) {
				ActividadCuestionario actividadFinal = new ActividadCuestionario();
				actividadFinal.setIntroduccion(actividad.getIntroduccion());
				if (idSeccion != null) {
					Seccion seccion = sservice.buscarPorId(idSeccion);
					actividadFinal.setSeccion(seccion);
					actividadFinal = service.crear(actividadFinal);
					if (actividad.getEnunciados() != null && actividad.getEnunciados().size() > 0) {
						List<Enunciado> enunciadosFinal = new ArrayList<Enunciado>();
						for (Enunciado enunciado : actividad.getEnunciados()) {
							Enunciado enunciadoFinal = new Enunciado();
							enunciadoFinal.setEnunciado(enunciado.getEnunciado());
							enunservice.crear(enunciadoFinal);
							/// OPCION MULTIPLE
							if (enunciado.getListaOpcionesMultiples() != null
									&& enunciado.getListaOpcionesMultiples().size() > 0) {
								List<OpcionMultiple> opcionesMultiples = new ArrayList<OpcionMultiple>();
								for (OpcionMultiple opcionMultiple : enunciado.getListaOpcionesMultiples()) {
									if (opcionMultiple.getOpciones() != null
											&& opcionMultiple.getOpciones().size() > 0) {
										OpcionMultiple opcionMultipleFinal = new OpcionMultiple();
										opcionMultipleFinal.setPregunta(opcionMultiple.getPregunta());
										opcionMultipleFinal = omservice.crear(opcionMultipleFinal);
										List<Opcion> opcionesFinal = new ArrayList<Opcion>();
										for (Opcion opcion : opcionMultiple.getOpciones()) {
											if (opcion != null) {
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
								enunciadoFinal.setListaOpcionesMultiples(opcionesMultiples);
								enunservice.crear(enunciadoFinal);
							}
							// OPCION PREGUNTA ABIERTA
							if (enunciado.getListaPreguntasCompletar() != null
									&& enunciado.getListaPreguntasCompletar().size() > 0) {
								List<PreguntaAbierta> preguntasAbiertas = new ArrayList<PreguntaAbierta>();
								for (PreguntaAbierta preguntaAbierta : enunciado.getListaPreguntasCompletar()) {
									if (preguntaAbierta != null) {
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

	

	/**
	 * Metodo que permite crear un ahorcado en la base de datos 
	 * @param ahorcado entidad en forma de json que ingresa desde el forntend
	 * @param idSeccion seccion a la cual le asignaremos el ahorcado 
	 * @return
	 */
	@Secured({ "ROLE_USER", "ROLE_ADMIN" })
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

	/**
	 * Metodo que permite devolver una lista de ahorcados 
	 * @param idSeccion nos dice de seccion sacaremos los ahorcados
	 * @return
	 */
	@GetMapping("/listarAhorcados")
	public ResponseEntity<?> listarAhorcados(@RequestParam Long idSeccion) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (idSeccion != null) {
				List<Ahorcado> listaAhorcados = ahorcadoServices.listarAhorcadosPorIdSeccion(idSeccion);
				if (listaAhorcados != null && !listaAhorcados.isEmpty()) {
					List<AhorcadoDTO> listaEnviar = new ArrayList<>();
					listaAhorcados.forEach((p) -> {
						listaEnviar.add(transformarAhorcadoToDTO(p));
					});
					response.put("data", listaEnviar);
					response.put("mensaje", "Se ha listado satisfactoriamente los ahorcados");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				} else {
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

	
	
	/**
	 * metodo que permite crear una actividad del tipo emparejamiento 
	 * @param actividad objeto que ingresa por medio del servicio para ser creado 
	 * @param idSeccion nos mapea la seccion a la cual pertenece la actividad
	 * @return
	 */
	//@Secured({ "ROLE_USER", "ROLE_ADMIN" })
	@Transactional(rollbackFor = {DataAccessException.class,Exception.class})
	@PostMapping("/crearEmparejamiento")
	public ResponseEntity<?> crearEmparejamiento(@RequestBody ActividadEmparejamiento actividad, @RequestParam Long idSeccion) {
		Map<String, Object> response = new HashMap<>();

		try {
			if(actividad != null) {
				ActividadEmparejamiento actividadFinal = new ActividadEmparejamiento();
				actividadFinal.setEnunciado(actividad.getEnunciado());
				Seccion seccion = sservice.buscarPorId(idSeccion);
				if(seccion != null) {
					actividadFinal.setSeccion(seccion);
					actividadFinal = emparejamientoServices.crearActividadEmparejamiento(actividadFinal);
					if(actividadFinal != null && !actividad.getParejas().isEmpty()) {
						List<ParejaItem> parejas =  new ArrayList<ParejaItem>();
						for(ParejaItem paraja : actividad.getParejas()) {
							ParejaItem parejaFinal = new ParejaItem();
							parejaFinal.setCadena1(paraja.getCadena1());
							parejaFinal.setCadena2(paraja.getCadena2());
							parejaFinal.setActividad(actividadFinal);
							parejaFinal = emparejamientoServices.crearParejaItem(parejaFinal);
							parejas.add(parejaFinal);
						}
						actividadFinal.setParejas(parejas);
						actividadFinal = emparejamientoServices.crearActividadEmparejamiento(actividadFinal);
						response.put("data", transformarEmparejamientoADTO(actividadFinal));
						response.put("mensaje", "Se ha creado satisfactoriamente la actividad");
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
						
					}else {
						response.put("data", null);
						response.put("mensaje", "Se presento un error creando la actividad emparejamiento");
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
					}
				}else {
					response.put("data", null);
					response.put("mensaje", "No existe la sección");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
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
		response.put("mensaje", "Se presento un error creando la actividad emparejamiento");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}
	
	/**
	 * Este metodo permite transformar una entidad del tipo ActividadEmparejamiento a ActividadEmparejamientoDTO para poder enviarla 
	 * @param actividad entidad actividad que sera transformada
	 * @return ActividadEmparejamientoDTO objeto transformado para enviar
	 */
	ActividadEmparejamientoDTO transformarEmparejamientoADTO(ActividadEmparejamiento actividad) {
		ActividadEmparejamientoDTO actividadDTO = new ActividadEmparejamientoDTO();
		actividadDTO.setEnunciado(actividad.getEnunciado());
		actividadDTO.setId(actividad.getId());
		actividadDTO.setIdSeccion(actividad.getSeccion().getId());
		List<ParejaItemDTO> parejas = new ArrayList<ParejaItemDTO>();
		for(ParejaItem pa : actividad.getParejas()) {
			ParejaItemDTO pareja =  new ParejaItemDTO();
			pareja.setActividad(actividad.getId());
			pareja.setCadena1(pa.getCadena1());
			pareja.setCadena2(pa.getCadena2());
			pareja.setId(pa.getId());
			parejas.add(pareja);
		}
		actividadDTO.setParejas(parejas);
		return actividadDTO;
	}

	
	/**
	 * permite transformar un objeto del tipo ahorcado para poder ser enviado al frontend
	 * @param ahorcado 
	 * @return ahorcadoDTO
	 */
	public AhorcadoDTO transformarAhorcadoToDTO(Ahorcado ahorcado) {
		AhorcadoDTO ahorcadoDTO = new AhorcadoDTO();

		ahorcadoDTO.setId(ahorcado.getId());
		ahorcadoDTO.setPalabraOculta(ahorcado.getPalabraOculta());
		ahorcadoDTO.setIdSeccion(ahorcado.getSeccion().getId());

		return ahorcadoDTO;
	}
	
	/**
	 * Permite trasnformar una entidad ActividadCuestionario en una clase DTO para enviar
	 * @param cuestionario
	 * @return ActividadCuestionarioDTO
	 */
	private ActividadCuestionarioDTO convertirCuestionarioADTO(ActividadCuestionario cuestionario) {

		ActividadCuestionarioDTO cuestionarioDTO = new ActividadCuestionarioDTO();
		cuestionarioDTO.setId(cuestionario.getId());
		cuestionarioDTO.setIntroduccion(cuestionario.getIntroduccion());
		cuestionarioDTO.setSeccionCuestionario(cuestionario.getSeccion().getId());
		List<EnunciadoDTO> listaEnunciados = new ArrayList<EnunciadoDTO>();
		for (Enunciado enunciado : cuestionario.getEnunciados()) {
			EnunciadoDTO enunciadoDTO = new EnunciadoDTO();
			enunciadoDTO.setEnunciado(enunciado.getEnunciado());
			enunciadoDTO.setId(enunciado.getId());
			enunciadoDTO.setActividadCuestionario(cuestionario.getId());
			List<PreguntaAbiertaDTO> preguntasAbiertas = new ArrayList<PreguntaAbiertaDTO>();
			if (enunciado.getListaPreguntasCompletar() != null) {
				for (PreguntaAbierta preguntaAbierta : enunciado.getListaPreguntasCompletar()) {
					PreguntaAbiertaDTO preguntaAbiertaDTO = new PreguntaAbiertaDTO();
					preguntaAbiertaDTO.setEnunciadoPreguntaAbierta(enunciado.getId());
					preguntaAbiertaDTO.setId(preguntaAbierta.getId());
					preguntaAbiertaDTO.setPalabraARellenar(preguntaAbierta.getPalabraARellenar());
					preguntaAbiertaDTO.setTexto(preguntaAbierta.getTexto());
					preguntasAbiertas.add(preguntaAbiertaDTO);
				}
			}
			enunciadoDTO.setListaPreguntasCompletar(preguntasAbiertas);
			List<OpcionMultipleDTO> opcionesMultiples = new ArrayList<OpcionMultipleDTO>();
			if (enunciado.getListaOpcionesMultiples() != null) {
				for (OpcionMultiple opcionMultiple : enunciado.getListaOpcionesMultiples()) {
					OpcionMultipleDTO opcionMultipleDTO = new OpcionMultipleDTO();
					opcionMultipleDTO.setId(opcionMultiple.getId());
					opcionMultipleDTO.setEnunciado(opcionMultiple.getEnunciado().getId());
					opcionMultipleDTO.setPregunta(opcionMultiple.getPregunta());
					List<OpcionDTO> opciones = new ArrayList<OpcionDTO>();
					for (Opcion opcion : opcionMultiple.getOpciones()) {
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
			}
			enunciadoDTO.setListaOpcionesMultiples(opcionesMultiples);
			listaEnunciados.add(enunciadoDTO);
		}
		cuestionarioDTO.setEnunciados(listaEnunciados);
		return cuestionarioDTO;
	}
	


}
