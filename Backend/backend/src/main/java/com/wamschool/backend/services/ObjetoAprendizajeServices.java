package com.wamschool.backend.services;

import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.ObjetoAprendizaje;
import com.wamschool.backend.model.Seccion;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ObjetoAprendizajeServices {

	public ObjetoAprendizaje crearObjetoAprendizaje(ObjetoAprendizaje oa) throws Exception;
	
	public ObjetoAprendizaje actualizarObjetoAprendizaje(ObjetoAprendizaje oa);
	
	public void eliminarObjetoAprendizaje(Long id);
	
	public ObjetoAprendizaje buscarObjetoAprendizaje(Long id);
	
	public List<ObjetoAprendizaje> listarTodosOA();
	
	public Page<ObjetoAprendizaje> listarOAPorCategorias(List<Categoria> categorias,Pageable pageable);
	
	public Page<ObjetoAprendizaje> listarPorAproximacionText(String text,Pageable pageable);
	
	public Categoria extraerCategoria(String nombre);
	
	public List<Categoria> listarCategorias();
	
	public Page<ObjetoAprendizaje> paginaListaOA(Pageable pageable);
	
	public Seccion crearSeccion(Seccion seccion);
	
	public List<Seccion> listarSeccionesPorOA(Long idOA);
}
