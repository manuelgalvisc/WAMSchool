package com.wamschool.backend.dto;

import java.io.Serializable;


public class OpcionDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long id;
	private String opcion;
	private Boolean valor;
	private Long opcionMultiple;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getOpcion() {
		return opcion;
	}
	public void setOpcion(String opcion) {
		this.opcion = opcion;
	}
	public Boolean getValor() {
		return valor;
	}
	public void setValor(Boolean valor) {
		this.valor = valor;
	}
	public Long getOpcionMultiple() {
		return opcionMultiple;
	}
	public void setOpcionMultiple(Long opcionMultiple) {
		this.opcionMultiple = opcionMultiple;
	}
}
