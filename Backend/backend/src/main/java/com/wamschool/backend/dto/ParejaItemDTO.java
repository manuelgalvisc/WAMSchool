package com.wamschool.backend.dto;

import java.io.Serializable;

/*
 * clase encargada de generar el objeto DTO para su posterior envio 
 */

public class ParejaItemDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;

	private String cadena1;
	
	private String cadena2;
	
	private Long actividad;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCadena1() {
		return cadena1;
	}

	public void setCadena1(String cadena1) {
		this.cadena1 = cadena1;
	}

	public String getCadena2() {
		return cadena2;
	}

	public void setCadena2(String cadena2) {
		this.cadena2 = cadena2;
	}

	public Long getActividad() {
		return actividad;
	}

	public void setActividad(Long actividad) {
		this.actividad = actividad;
	}

}
