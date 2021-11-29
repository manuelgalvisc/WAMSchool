package com.wamschool.backend.dto;

public class AhorcadoDTO {
	private Long id;
	private String palabraOculta;
	private Long idSeccion;
	private String indicio;
	/**
	 * @return the indicio
	 */
	public String getIndicio() {
		return indicio;
	}
	/**
	 * @param indicio the indicio to set
	 */
	public void setIndicio(String indicio) {
		this.indicio = indicio;
	}
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
	 * @return the palabraOculta
	 */
	public String getPalabraOculta() {
		return palabraOculta;
	}
	/**
	 * @param palabraOculta the palabraOculta to set
	 */
	public void setPalabraOculta(String palabraOculta) {
		this.palabraOculta = palabraOculta;
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
	
	
}
