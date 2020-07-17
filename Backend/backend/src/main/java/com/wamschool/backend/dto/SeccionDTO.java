package com.wamschool.backend.dto;

import java.io.Serializable;

public class SeccionDTO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Long idSeccion;
	private String nombreSeccion;
	private String descripcion;
	private Integer posInOA;
	private Long idOA;
	public Long getIdSeccion() {
		return idSeccion;
	}
	public void setIdSeccion(Long idSeccion) {
		this.idSeccion = idSeccion;
	}
	public String getNombreSeccion() {
		return nombreSeccion;
	}
	public void setNombreSeccion(String nombreSeccion) {
		this.nombreSeccion = nombreSeccion;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public Integer getPosInOA() {
		return posInOA;
	}
	public void setPosInOA(Integer posInOA) {
		this.posInOA = posInOA;
	}
	public Long getIdOA() {
		return idOA;
	}
	public void setIdOA(Long idOA) {
		this.idOA = idOA;
	}
	
	
}
