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

/**
 * Entidad que se encarga de modelar la entidad Pareja Item que apoya a la entidad 
 * Actividad  emparejamiento
 * @author acer
 *
 */
@Entity
@Table(name = "AC_ITEM")
public class ParejaItem implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "ACT_ITEM_CADENA1")
	private String cadena1;
	
	@Column(name = "ACT_ITEM_CADENA2")
	private String cadena2;
	
	@ManyToOne
	@JoinColumn(name = "ACTIVIDAD_ID")
	private ActividadEmparejamiento actividad;
	
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

	public ActividadEmparejamiento getActividad() {
		return actividad;
	}

	public void setActividad(ActividadEmparejamiento actividad) {
		this.actividad = actividad;
	}


}
