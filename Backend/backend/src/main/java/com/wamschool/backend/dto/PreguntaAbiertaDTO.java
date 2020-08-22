package com.wamschool.backend.dto;

import java.io.Serializable;


public class PreguntaAbiertaDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;
	private String texto;
	private String palabraARellenar;
	private Long enunciadoPreguntaAbierta;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public String getPalabraARellenar() {
		return palabraARellenar;
	}
	public void setPalabraARellenar(String palabraARellenar) {
		this.palabraARellenar = palabraARellenar;
	}
	public Long getEnunciadoPreguntaAbierta() {
		return enunciadoPreguntaAbierta;
	}
	public void setEnunciadoPreguntaAbierta(Long enunciadoPreguntaAbierta) {
		this.enunciadoPreguntaAbierta = enunciadoPreguntaAbierta;
	}
	
	
	
	
}
