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
@Table(name = "ACT_OPCION")
public class Opcion implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ACT_OP_ID")
	private Long id;
	
	@Column(name = "ACT_OP_OPCION")
	private String opcion;
	
	@Column(name = "ACT_OP_VALOR")
	private Boolean valor;
	
	@ManyToOne
	@JoinColumn(name = "ACT_OP_OM")
	private OpcionMultiple opcionMultiple;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getOpcion() {
		return opcion;
	}

	public void setOpcion(String opcion) {
		this.opcion = opcion;
	}

	public Boolean getValor() {
		return valor;
	}

	public void setValor(Boolean valor) {
		this.valor = valor;
	}
	
	public OpcionMultiple getOpcionMultiple() {
		return opcionMultiple;
	}

	public void setOpcionMultiple(OpcionMultiple opcionMultiple) {
		this.opcionMultiple = opcionMultiple;
	}
	
	
	
}
