package com.wamschool.backend.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.EstadosOA;

public class ObjetoAprendizajeDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7760960079909643001L;

	private String nombreCompletoPropietario;
	private String emailPropiertario;
	private Long idOA;
	private String tituloOA;
	private String descripcion;
	private Date fechaActualizacion;
	private EstadosOA estadoOA;
	private List<Categoria> categorias;
	private Integer visitas;
	public String getNombreCompletoPropietario() {
		return nombreCompletoPropietario;
	}
	public void setNombreCompletoPropietario(String nombreCompletoPropietario) {
		this.nombreCompletoPropietario = nombreCompletoPropietario;
	}
	public String getEmailPropiertario() {
		return emailPropiertario;
	}
	public void setEmailPropiertario(String emailPropiertario) {
		this.emailPropiertario = emailPropiertario;
	}
	public Long getIdOA() {
		return idOA;
	}
	public void setIdOA(Long idOA) {
		this.idOA = idOA;
	}
	public String getTituloOA() {
		return tituloOA;
	}
	public void setTituloOA(String tituloOA) {
		this.tituloOA = tituloOA;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public Date getFechaActualizacion() {
		return fechaActualizacion;
	}
	public void setFechaActualizacion(Date fechaActualizacion) {
		this.fechaActualizacion = fechaActualizacion;
	}
	public EstadosOA getEstadoOA() {
		return estadoOA;
	}
	public void setEstadoOA(EstadosOA estadoOA) {
		this.estadoOA = estadoOA;
	}
	public List<Categoria> getCategorias() {
		return categorias;
	}
	public void setCategorias(List<Categoria> categorias) {
		this.categorias = categorias;
	}
	public Integer getVisitas() {
		return visitas;
	}
	public void setVisitas(Integer visitas) {
		this.visitas = visitas;
	}
	
	
}
