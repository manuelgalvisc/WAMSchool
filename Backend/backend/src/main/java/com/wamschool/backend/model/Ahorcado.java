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
@Table(name="JUEGOS_AHORCADOS")
public class Ahorcado implements Serializable {
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;
	
	@Column(name="PALABRA_OCULTA")
	private String palabraOculta;
	
	@ManyToOne
	@JoinColumn(name="SECCION_ID")
	private Seccion seccion; 
	
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
	 * @return the seccion
	 */
	public Seccion getSeccion() {
		return seccion;
	}

	/**
	 * @param seccion the seccion to set
	 */
	public void setSeccion(Seccion seccion) {
		this.seccion = seccion;
	}


	
	private static final long serialVersionUID = 1L;

}
