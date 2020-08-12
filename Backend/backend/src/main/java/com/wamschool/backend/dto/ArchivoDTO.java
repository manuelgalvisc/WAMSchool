package com.wamschool.backend.dto;

import java.io.Serializable;

public class ArchivoDTO implements Serializable{

	private Long idArchivo;
	private String url;
	private String nombre;
	private Long idPagina;
	
	
	/**
	 * @return the idArchivo
	 */
	public Long getIdArchivo() {
		return idArchivo;
	}


	/**
	 * @param idArchivo the idArchivo to set
	 */
	public void setIdArchivo(Long idArchivo) {
		this.idArchivo = idArchivo;
	}


	/**
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}


	/**
	 * @param url the url to set
	 */
	public void setUrl(String url) {
		this.url = url;
	}


	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}


	/**
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	/**
	 * @return the idPagina
	 */
	public Long getIdPagina() {
		return idPagina;
	}


	/**
	 * @param idPagina the idPagina to set
	 */
	public void setIdPagina(Long idPagina) {
		this.idPagina = idPagina;
	}


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
}
