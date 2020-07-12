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
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "USUARIOS")
public class Usuario implements Serializable,Cloneable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -1152198757387441037L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "U_ID")
	private Long id;
	
	@Column(name = "U_NAME")
	private String nombre;
	
	@Column(name = "U_APELLIDO")
	private String apellido;
	
	@Column(name = "U_EMAIL", unique = true)
	private String email;
	
	@Column(name = "U_PASSWORD")
	private String password;
	
	@Column(name = "U_FECHANACIMIENTO")
	private Date fechaNacimiento;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name="usuarios_roles", joinColumns= @JoinColumn(name="usuario_id"),
	inverseJoinColumns=@JoinColumn(name="role_id"),
	uniqueConstraints= {@UniqueConstraint(columnNames= {"usuario_id", "role_id"})})
	private List<Role> roles;

	@OneToMany(mappedBy = "propietario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<ObjetoAprendizaje> objetosAprendizaje;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public List<ObjetoAprendizaje> getObjetosAprendizaje() {
		return objetosAprendizaje;
	}

	public void setObjetosAprendizaje(List<ObjetoAprendizaje> objetosAprendizaje) {
		this.objetosAprendizaje = objetosAprendizaje;
	}

	
	
    
	
	

}
