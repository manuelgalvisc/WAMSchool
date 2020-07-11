package com.wamschool.backend.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;


@Entity
@Table(name = "OBJETO_APRENDIZAJE")
public class ObjetoAprendizaje implements Serializable,Cloneable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3343654501921212893L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "OA_ID")
	private Long id;
	
	@Column(name = "OA_TITULO")
	private String tituloOA;
	
	@Column(name = "OA_DESCRIPCION" ,columnDefinition = "text")
	private String descripcion;
	
	@Column(name = "OA_FECHACREACION")
	private Date fechaCreacion;
	
	@Column(name = "OA_FECHAACTUALIZACION")
	private Date fechaActualizacion;
	
	@ManyToOne
	@JoinColumn(name = "OA_PROPIETARIO_id")
	private Usuario propietario;
	
	@Column(name = "OA_ESTADO")
	private EstadosOA estadoOA;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name="oa_categoria", joinColumns= @JoinColumn(name="oa_id"),
	inverseJoinColumns=@JoinColumn(name="categoria_id"),
	uniqueConstraints= {@UniqueConstraint(columnNames= {"oa_id", "categoria_id"})})
	private List<Categoria> categorias;

	@Column(name = "OA_VISITAS")
	private Integer visitas;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}

	public Date getFechaActualizacion() {
		return fechaActualizacion;
	}

	public void setFechaActualizacion(Date fechaActualizacion) {
		this.fechaActualizacion = fechaActualizacion;
	}

	public Usuario getPropietario() {
		return propietario;
	}

	public void setPropietario(Usuario propietario) {
		this.propietario = propietario;
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

	@Override
	public Object clone() {
		Object c = null;
		try {
			c = (ObjetoAprendizaje)super.clone();
		}catch(CloneNotSupportedException e) {
			
		}
		return c; 
	}
	
	

}
