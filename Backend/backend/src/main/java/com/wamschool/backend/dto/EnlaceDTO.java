package com.wamschool.backend.dto;


public class EnlaceDTO {
	
	private Long id;
	private String url;
	private String nombre;
	private Long idPagina;
	
	
	
	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
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
	
	

}
