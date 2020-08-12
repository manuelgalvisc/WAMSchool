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

@Entity
@Table(name = "ACT_CUESTIONARIO")
public class ActividadCuestionario implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ACT_CUES_ID")
	private Long id;

	@Column(name = "ACT_CUES_INTRO")
	private String introduccion;

	@OneToMany(mappedBy = "actividadCuestionario", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Enunciado> enunciados;

	@ManyToOne
	@JoinColumn(name = "ACT_CUES_SECC_ID")
	private Seccion seccionCuestionario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIntroduccion() {
		return introduccion;
	}

	public void setIntroduccion(String introduccion) {
		this.introduccion = introduccion;
	}

	public List<Enunciado> getEnunciados() {
		return enunciados;
	}

	public void setEnunciados(List<Enunciado> enunciados) {
		this.enunciados = enunciados;
	}

	public Seccion getSeccion() {
		return seccionCuestionario;
	}

	public void setSeccion(Seccion seccion) {
		this.seccionCuestionario = seccion;
	}

}
