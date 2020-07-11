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
@Table(name = "secciones")
public class Seccion implements Serializable, Cloneable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;
	
	@Column(name = "s_nombre")
	private String nombreSeccion;
	
	@Column(name = "s_descripcion", columnDefinition = "text")
	private String descripcion;
	
	@ManyToOne
	@JoinColumn(name = "s_oa_id")
	private ObjetoAprendizaje objetoAprendizaje;
	
	@Column(name = "s_posInOA")
	private Integer posInOA;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public ObjetoAprendizaje getObjetoAprendizaje() {
		return objetoAprendizaje;
	}

	public void setObjetoAprendizaje(ObjetoAprendizaje objetoAprendizaje) {
		this.objetoAprendizaje = objetoAprendizaje;
	}

	public Integer getPosInOA() {
		return posInOA;
	}

	public void setPosInOA(Integer posInOA) {
		this.posInOA = posInOA;
	}
	
	
	
}
