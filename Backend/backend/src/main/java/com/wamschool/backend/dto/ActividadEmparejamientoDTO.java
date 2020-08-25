package com.wamschool.backend.dto;

import java.io.Serializable;
import java.util.List;

/**
 * clase encarga de generar un objeto dto para su posterior envio
 * @author acer
 *
 */
public class ActividadEmparejamientoDTO implements Serializable {
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEnunciado() {
		return enunciado;
	}

	public void setEnunciado(String enunciado) {
		this.enunciado = enunciado;
	}

	public List<ParejaItemDTO> getParejas() {
		return parejas;
	}

	public void setParejas(List<ParejaItemDTO> parejas) {
		this.parejas = parejas;
	}

	public Long getIdSeccion() {
		return idSeccion;
	}

	public void setIdSeccion(Long idSeccion) {
		this.idSeccion = idSeccion;
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;
	
	private String enunciado;
	
	private List<ParejaItemDTO> parejas;
	
	private Long idSeccion;


}
