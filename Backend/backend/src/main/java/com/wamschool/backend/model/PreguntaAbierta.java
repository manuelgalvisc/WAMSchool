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
@Table(name = "ACT_PREGUNTAABIERTA")
public class PreguntaAbierta implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ACT_PA_ID")
	private Long id;

	@Column(name = "ACT_PA_TEXTO",columnDefinition = "text")
	private String texto;

	@Column(name = "ACT_PA_PALABRA")
	private String palabraARellenar;

	@ManyToOne
	@JoinColumn(name = "ACT_PA_EN_ID")
	private Enunciado enunciadoPreguntaAbierta;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public String getPalabraARellenar() {
		return palabraARellenar;
	}

	public void setPalabraARellenar(String palabraARellenar) {
		this.palabraARellenar = palabraARellenar;
	}

	public Enunciado getEnunciado() {
		return enunciadoPreguntaAbierta;
	}

	public void setEnunciado(Enunciado enunciado) {
		this.enunciadoPreguntaAbierta = enunciado;
	}

}
