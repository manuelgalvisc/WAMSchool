package com.wamschool.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ENLACES")
public class Enlace implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ENLACE_ID")
	private Long id;
	
	@Column(name="ENLACE_URL")
	private String url;
	
	@Column(name="ENLACE_NOMBRE")
	private String nombre;
	
	@ManyToOne
	@JoinColumn(name="ID_PAGINA")
	private Pagina pagina; 
	
	
	
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
	 * @return the pagina
	 */
	public Pagina getPagina() {
		return pagina;
	}
	/**
	 * @param pagina the pagina to set
	 */
	public void setPagina(Pagina pagina) {
		this.pagina = pagina;
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
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
}
