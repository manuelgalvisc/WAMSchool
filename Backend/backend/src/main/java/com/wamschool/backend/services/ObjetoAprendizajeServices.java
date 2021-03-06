package com.wamschool.backend.services;

import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.ObjetoAprendizaje;
import java.util.List;

public interface ObjetoAprendizajeServices {

	public ObjetoAprendizaje crearObjetoAprendizaje(ObjetoAprendizaje oa) throws Exception;
	
	public ObjetoAprendizaje actualizarObjetoAprendizaje(ObjetoAprendizaje oa);
	
	public void eliminarObjetoAprendizaje(Long id);
	
	public ObjetoAprendizaje buscarObjetoAprendizaje(Long id);
	
	public List<ObjetoAprendizaje> listarTodosOA();
	
	public List<ObjetoAprendizaje> listarOAPorCategorias(List<Categoria> categorias);
	
	public List<ObjetoAprendizaje> listarPorAproximacionText(String text);
	
	public Categoria extraerCategoria(String nombre);
}
