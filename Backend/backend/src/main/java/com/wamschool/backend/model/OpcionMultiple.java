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
@Table(name = "ACT_OPCIONMULTIPLE")
public class OpcionMultiple implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ACT_OM_ID")
	private Long id;
	
	@Column(name = "ACT_OM_P",columnDefinition = "text")
	private String pregunta;
	
	@OneToMany(mappedBy = "opcionMultiple", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Opcion> opciones;

	@ManyToOne
	@JoinColumn(name = "ACT_OM_EN_ID")
	private Enunciado enunciado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<Opcion> getOpciones() {
		return opciones;
	}

	public void setOpciones(List<Opcion> opciones) {
		this.opciones = opciones;
	}

	public Enunciado getEnunciado() {
		return enunciado;
	}

	public void setEnunciado(Enunciado enunciado) {
		this.enunciado = enunciado;
	}

	public String getPregunta() {
		return pregunta;
	}

	public void setPregunta(String pregunta) {
		this.pregunta = pregunta;
	}
	
	

}
