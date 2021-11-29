package com.wamschool.backend.dto;

import java.io.Serializable;
import java.util.List;


public class EnunciadoDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String enunciado;
	private List<OpcionMultipleDTO> listaOpcionesMultiples;
	private List<PreguntaAbiertaDTO> listaPreguntasCompletar;
	private Long actividadCuestionario;
	
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
	public List<OpcionMultipleDTO> getListaOpcionesMultiples() {
		return listaOpcionesMultiples;
	}
	public void setListaOpcionesMultiples(List<OpcionMultipleDTO> listaOpcionesMultiples) {
		this.listaOpcionesMultiples = listaOpcionesMultiples;
	}
	public List<PreguntaAbiertaDTO> getListaPreguntasCompletar() {
		return listaPreguntasCompletar;
	}
	public void setListaPreguntasCompletar(List<PreguntaAbiertaDTO> listaPreguntasCompletar) {
		this.listaPreguntasCompletar = listaPreguntasCompletar;
	}
	public Long getActividadCuestionario() {
		return actividadCuestionario;
	}
	public void setActividadCuestionario(Long actividadCuestionario) {
		this.actividadCuestionario = actividadCuestionario;
	}
	
	
	

}
