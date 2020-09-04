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
 * Entidad que se encraga de modelar la entidad pagina
 * @author  wman 
 *
 */
@Entity
@Table(name="PAGINAS")
public class Pagina implements Serializable,Cloneable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ID_PAGINA")
	private Long id;
	
	@Column(name="NOMBRE_PAGINA")
	private String nombrePagina;
	
	@Column(name="CONTENIDO_PAGINA",columnDefinition = "text")
	private String contenidoPagina;
	
	@ManyToOne
	@JoinColumn(name="SECCION_ID")
	private Seccion seccion;
	
	@OneToMany(mappedBy = "pagina", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Archivo> archivos;
	
	@OneToMany(mappedBy = "pagina", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Enlace> enlaces;
	
	
	@Column(name="TIPO_PAGINA")
	private TipoPaginas tipo;
	
	
	
	/**
	 * @return the tipo
	 */
	public TipoPaginas getTipo() {
		return tipo;
	}



	/**
	 * @param tipo the tipo to set
	 */
	public void setTipo(TipoPaginas tipo) {
		this.tipo = tipo;
	}



	/**
	 * @return the enlaces
	 */
	public List<Enlace> getEnlaces() {
		return enlaces;
	}



	/**
	 * @param enlaces the enlaces to set
	 */
	public void setEnlaces(List<Enlace> enlaces) {
		this.enlaces = enlaces;
	}



	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}



	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}



	/**
	 * @return the nombrePagina
	 */
	public String getNombrePagina() {
		return nombrePagina;
	}



	/**
	 * @param nombrePagina the nombrePagina to set
	 */
	public void setNombrePagina(String nombrePagina) {
		this.nombrePagina = nombrePagina;
	}



	/**
	 * @return the contenidoPagina
	 */
	public String getContenidoPagina() {
		return contenidoPagina;
	}



	/**
	 * @param contenidoPagina the contenidoPagina to set
	 */
	public void setContenidoPagina(String contenidoPagina) {
		this.contenidoPagina = contenidoPagina;
	}



	/**
	 * @return the archivos
	 */
	public List<Archivo> getArchivos() {
		return archivos;
	}



	/**
	 * @param archivos the archivos to set
	 */
	public void setArchivos(List<Archivo> archivos) {
		this.archivos = archivos;
	}


	/**
	 * @return the seccion
	 */
	public Seccion getSeccion() {
		return seccion;
	}



	/**
	 * @param seccion the seccion to set
	 */
	public void setSeccion(Seccion seccion) {
		this.seccion = seccion;
	}



	
	
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

}
