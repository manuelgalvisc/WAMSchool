package com.wamschool.backend.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Esta entidad se encarga de modelar las actividades emparejamiento
 * @author wman
 *
 */
@Entity
@Table(name = "ACT_EMP")
public class ActividadEmparejamiento implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "ACT_EMP_ENUNCIADO")
	private String enunciado;
	
	@OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<ParejaItem> parejas;
	
	@ManyToOne
	@JoinColumn(name = "seccion")
	private Seccion seccion;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEnunciado() {
		return enunciado;
	}

	public void setEnunciado(String enunciado) {
		this.enunciado = enunciado;
	}

	public List<ParejaItem> getParejas() {
		return parejas;
	}

	public void setParejas(List<ParejaItem> parejas) {
		this.parejas = parejas;
	}

	public Seccion getSeccion() {
		return seccion;
	}

	public void setSeccion(Seccion seccion) {
		this.seccion = seccion;
	}

	
	
}
