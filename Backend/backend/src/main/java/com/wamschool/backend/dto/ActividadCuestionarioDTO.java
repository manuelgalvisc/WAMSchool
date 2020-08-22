package com.wamschool.backend.dto;

import java.io.Serializable;
import java.util.List;


public class ActividadCuestionarioDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String introduccion;
	private List<EnunciadoDTO> enunciados;
	private Long seccionCuestionario;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIntroduccion() {
		return introduccion;
	}
	public void setIntroduccion(String introduccion) {
		this.introduccion = introduccion;
	}
	public List<EnunciadoDTO> getEnunciados() {
		return enunciados;
	}
	public void setEnunciados(List<EnunciadoDTO> enunciados) {
		this.enunciados = enunciados;
	}
	public Long getSeccionCuestionario() {
		return seccionCuestionario;
	}
	public void setSeccionCuestionario(Long seccionCuestionario) {
		this.seccionCuestionario = seccionCuestionario;
	}

	
}
