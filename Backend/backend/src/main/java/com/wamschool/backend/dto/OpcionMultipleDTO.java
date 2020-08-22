package com.wamschool.backend.dto;

import java.io.Serializable;
import java.util.List;


public class OpcionMultipleDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;
	private String pregunta;
	private List<OpcionDTO> opciones;
	private Long enunciado;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPregunta() {
		return pregunta;
	}
	public void setPregunta(String pregunta) {
		this.pregunta = pregunta;
	}
	public List<OpcionDTO> getOpciones() {
		return opciones;
	}
	public void setOpciones(List<OpcionDTO> opciones) {
		this.opciones = opciones;
	}
	public Long getEnunciado() {
		return enunciado;
	}
	public void setEnunciado(Long enunciado) {
		this.enunciado = enunciado;
	}
	
	
}
