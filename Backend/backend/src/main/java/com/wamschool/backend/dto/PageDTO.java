package com.wamschool.backend.dto;

import java.io.Serializable;

public class PageDTO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8215373499123265496L;
	
	private Integer numeroPagina;
	private Integer numeroPaginas;
	public Integer getNumeroPagina() {
		return numeroPagina;
	}
	public void setNumeroPagina(Integer numeroPagina) {
		this.numeroPagina = numeroPagina;
	}
	public Integer getNumeroPaginas() {
		return numeroPaginas;
	}
	public void setNumeroPaginas(Integer numeroPaginas) {
		this.numeroPaginas = numeroPaginas;
	}
	
	
}
