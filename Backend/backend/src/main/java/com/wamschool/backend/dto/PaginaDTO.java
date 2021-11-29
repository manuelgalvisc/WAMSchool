package com.wamschool.backend.dto;

import com.wamschool.backend.model.TipoPaginas;

public class PaginaDTO {
	
	private Long idPagina;
	private String nombrePagina;
	private String contenidoPagina;
	private Long idSeccion;
	private TipoPaginas tipo;
	
	
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
	 * @return the nombrePagina
	 */
	public String getNombrePagina() {
		return nombrePagina;
	}
	/**
	 * @param nombrePagina the nombrePagina to set
	 */
	public void setNombrePagina(String nombrePagina) {
		this.nombrePagina = nombrePagina;
	}
	/**
	 * @return the contenidoPagina
	 */
	public String getContenidoPagina() {
		return contenidoPagina;
	}
	/**
	 * @param contenidoPagina the contenidoPagina to set
	 */
	public void setContenidoPagina(String contenidoPagina) {
		this.contenidoPagina = contenidoPagina;
	}
	/**
	 * @return the idSeccion
	 */
	public Long getIdSeccion() {
		return idSeccion;
	}
	/**
	 * @param idSeccion the idSeccion to set
	 */
	public void setIdSeccion(Long idSeccion) {
		this.idSeccion = idSeccion;
	}
	/**
	 * @return the tipo
	 */
	public TipoPaginas getTipo() {
		return tipo;
	}
	/**
	 * @param tipo the tipo to set
	 */
	public void setTipo(TipoPaginas tipo) {
		this.tipo = tipo;
	}
	

}
