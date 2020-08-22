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
@Table(name = "ACT_ENUNCIADO")
public class Enunciado implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ACT_EN_ID")
	private Long id;

	@Column(name = "ACT_EN",columnDefinition = "text")
	private String enunciado;

	@OneToMany(mappedBy = "enunciado", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<OpcionMultiple> listaOpcionesMultiples;

	@OneToMany(mappedBy = "enunciadoPreguntaAbierta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<PreguntaAbierta> listaPreguntasCompletar;

	@ManyToOne
	@JoinColumn(name = "ACT_EN_ACTC_ID")
	private ActividadCuestionario actividadCuestionario;

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

	public List<OpcionMultiple> getListaOpcionesMultiples() {
		return listaOpcionesMultiples;
	}

	public void setListaOpcionesMultiples(List<OpcionMultiple> listaOpcionesMultiples) {
		this.listaOpcionesMultiples = listaOpcionesMultiples;
	}

	public List<PreguntaAbierta> getListaPreguntasCompletar() {
		return listaPreguntasCompletar;
	}

	public void setListaPreguntasCompletar(List<PreguntaAbierta> listaPreguntasCompletar) {
		this.listaPreguntasCompletar = listaPreguntasCompletar;
	}

	public ActividadCuestionario getActividadCuestionario() {
		return actividadCuestionario;
	}

	public void setActividadCuestionario(ActividadCuestionario actividadCuestionario) {
		this.actividadCuestionario = actividadCuestionario;
	}

}
