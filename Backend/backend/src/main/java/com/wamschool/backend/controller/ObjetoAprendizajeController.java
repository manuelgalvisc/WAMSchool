package com.wamschool.backend.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import com.wamschool.backend.dto.PageDTO;
import com.wamschool.backend.dto.SeccionDTO;
import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.ObjetoAprendizaje;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.model.Usuario;
import com.wamschool.backend.services.ObjetoAprendizajeServices;
import com.wamschool.backend.servicesImpl.UtilidadesServicesImpl;

import java.util.List;

/** 
 * Esta clase permite manejar los servicios relacionados al objeto de aprendizaje
 * @author WamSchool
 * @version 1.0
*/

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api/oa")
public class ObjetoAprendizajeController {

	@Autowired
	ObjetoAprendizajeServices service;
	@Autowired
	UtilidadesServicesImpl utilidades;

	/**
	 * Metodo que permite crear un objeto de aprendizaje en la base de datos 
	 * @param oa objeto de aprendizaje que se quiere crear 
	 * @return
	 */
	@Secured({"ROLE_USER", "ROLE_ADMIN"})
	@PostMapping("/crearOA")
	public ResponseEntity<?> crearOA(@RequestBody ObjetoAprendizaje oa) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (oa != null) {
				ObjetoAprendizaje oainput = (ObjetoAprendizaje) oa.clone();
				if (oainput != null) {
					Usuario userSet = utilidades.buscarUsuarioPorEmail(oa.getPropietario().getEmail());
					oainput.setPropietario(userSet);
					List<Categoria> categorias = oa.getCategorias();
					oainput.setCategorias(null);
					List<Categoria> categoriasReales = new ArrayList<Categoria>();
					for (Categoria cat : categorias) {
						Categoria aux = service.extraerCategoria(cat.getNombre());
						if (aux != null) {
							categoriasReales.add(aux);
						}
					}
					oainput.setCategorias(categoriasReales);
					if (oainput.getCategorias() != null && oainput.getPropietario() != null) {
						oainput.setFechaCreacion(new Date());
						oainput.setFechaActualizacion(new Date());
						oainput.setVisitas(0);
						oainput = service.crearObjetoAprendizaje(oainput);
						response.put("data", transformarADTO(oainput));
						response.put("mensaje", "Se ha creado el OA correctamente");
						return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
					}
				}
			}
		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error creando el OA");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error creando el OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Metodo que lista las categorias guardadas en la base de datos  
	 * @return lista de categorias
	 */
	@GetMapping("/listarCategorias")
	public ResponseEntity<?> listarCategorias() {
		Map<String, Object> response = new HashMap<>();
		try {
			List<Categoria> categorias = null;
			categorias = service.listarCategorias();
			if (categorias != null) {
				response.put("data", categorias);
				response.put("mensaje", "");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}

		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error creando el OA");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error accediendo a las categorias");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * permite listar tosdos los objetos de aprendizaje que se tienen almacenados en la base de datos 
	 * @return lista de objetos de aprendizaje
	 */
	@GetMapping("/listarOA")
	public ResponseEntity<?> listarOA() {
		Map<String, Object> response = new HashMap<>();
		try {
			List<ObjetoAprendizaje> listaOA = null;
			listaOA = service.listarTodosOA();
			if (listaOA != null) {
				List<ObjetoAprendizajeDTO> listaOAfin = new ArrayList<ObjetoAprendizajeDTO>();
				for (ObjetoAprendizaje x : listaOA) {
					listaOAfin.add(transformarADTO(x));
				}
				response.put("data", listaOAfin);
				response.put("mensaje", "");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}

		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("mensaje", "Se presento un error recuperando los OA");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("mensaje", "Se presento un error recuperando los OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Metodo que permite listar los objetos de aprendizaje por medio de paginacion
	 * @param pagina pagina que se desea mostrar
	 * @return
	 */
	@GetMapping("/listarOApag")
	public ResponseEntity<?> listarOA(@RequestParam int pagina) {
		Map<String, Object> response = new HashMap<>();
		try {
			Pageable pageable = PageRequest.of(pagina, 5);
			Page<ObjetoAprendizaje> listaOA = null;
			listaOA = service.paginaListaOA(pageable);
			List<ObjetoAprendizaje> listaOAs = listaOA.getContent();
			Integer size = listaOA.getTotalPages();

			PageDTO pageDTO = new PageDTO();
			pageDTO.setNumeroPagina(pagina);
			pageDTO.setNumeroPaginas(size);

			if (listaOAs != null) {
				List<ObjetoAprendizajeDTO> listaOAfin = new ArrayList<ObjetoAprendizajeDTO>();
				for (ObjetoAprendizaje x : listaOAs) {
					listaOAfin.add(transformarADTO(x));
				}
				response.put("data", listaOAfin);
				response.put("page", pageDTO);
				response.put("mensaje", "");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}

		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("page", null);
			response.put("mensaje", "Se presento un error recuperando los OA");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("page", null);
		response.put("mensaje", "Se presento un error recuperando los OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Metodo que permite listar los objetos de aprendizaje filtrados por una categoria
	 * @param categorias categorias parafiltrar
	 * @param pagina pagina que se desea mostrar
	 * @return
	 */
	@PostMapping("/listarOAcategorias")
	public ResponseEntity<?> listarOAcategorias(@RequestBody List<Categoria> categorias, @RequestParam int pagina) {
		Map<String, Object> response = new HashMap<>();
		try {
			Pageable pageable = PageRequest.of(pagina, 5);
			Page<ObjetoAprendizaje> paginas = null;
			paginas = service.listarOAPorCategorias(categorias, pageable);
			List<ObjetoAprendizaje> listaOA = paginas.getContent();
			PageDTO pageDTO = new PageDTO();
			pageDTO.setNumeroPagina(pagina);
			pageDTO.setNumeroPaginas(paginas.getTotalPages());

			if (listaOA != null && !listaOA.isEmpty()) {
				List<ObjetoAprendizajeDTO> listaOADTO = new ArrayList<ObjetoAprendizajeDTO>();
				for (ObjetoAprendizaje ob : listaOA) {
					listaOADTO.add(transformarADTO(ob));
				}
				response.put("data", listaOADTO);
				response.put("page", pageDTO);
				response.put("mensaje", "Lista OA por categorias");
				return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
			}

		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("page", null);
			response.put("mensaje", "Se presento un error recuperando los OA");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("page", null);
		response.put("mensaje", "Se presento un error recuperando los OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	/**
	 * metodo que permite listar los objetos de aprendizaje filtrados por texto en su nombre
	 * @param texto texto por el cual se filtrara la busqueda
	 * @param pagina 
	 * @return
	 */
	@GetMapping("/listarOAtexto")
	public ResponseEntity<?> listarOAtexto(@RequestParam String texto, @RequestParam int pagina) {
		Map<String, Object> response = new HashMap<>();
		try {
			if (!texto.equals("")) {

				Pageable pageable = PageRequest.of(pagina, 5);
				Page<ObjetoAprendizaje> paginas = null;
				paginas = service.listarPorAproximacionText(texto, pageable);
				List<ObjetoAprendizaje> listaOA = paginas.getContent();
				PageDTO pageDTO = new PageDTO();
				pageDTO.setNumeroPagina(pagina);
				pageDTO.setNumeroPaginas(paginas.getTotalPages());

				if (listaOA != null && !listaOA.isEmpty()) {
					List<ObjetoAprendizajeDTO> listaOADTO = new ArrayList<ObjetoAprendizajeDTO>();
					for (ObjetoAprendizaje ob : listaOA) {
						listaOADTO.add(transformarADTO(ob));
					}
					response.put("data", listaOADTO);
					response.put("page", pageDTO);
					response.put("mensaje", "Lista OA por categorias");
					return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
				}
			}

		} catch (DataAccessException ex) {
			response.put("data", null);
			response.put("page", null);
			response.put("mensaje", "Se presento un error recuperando los OA");
			return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			e.printStackTrace();
			e.getCause();
		}
		response.put("data", null);
		response.put("page", null);
		response.put("mensaje", "Se presento un error recuperando los OA");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
	}

	
	

	

	/**
	 * metodo que permite transformar una entidad del tipo objeto de aprendizaje en una clase DTO
	 * @param oa objeto de aprendizaje que se trasnformara
	 * @return ObjetoAprendizajeDTO
	 */
	private ObjetoAprendizajeDTO transformarADTO(ObjetoAprendizaje oa) {

		ObjetoAprendizajeDTO aux = new ObjetoAprendizajeDTO();
		aux.setNombreCompletoPropietario(oa.getPropietario().getNombre() + " " + oa.getPropietario().getApellido());
		aux.setEmailPropiertario(oa.getPropietario().getEmail());
		aux.setTituloOA(oa.getTituloOA());
		aux.setDescripcion(oa.getDescripcion());
		aux.setIdOA(oa.getId());
		aux.setFechaActualizacion(oa.getFechaActualizacion());
		aux.setEstadoOA(oa.getEstadoOA());
		aux.setVisitas(oa.getVisitas());
		aux.setCategorias(oa.getCategorias());
		return aux;
	}
	
	

}
