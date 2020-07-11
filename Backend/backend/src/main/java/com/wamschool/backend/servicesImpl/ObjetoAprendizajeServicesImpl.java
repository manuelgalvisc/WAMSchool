package com.wamschool.backend.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.ObjetoAprendizaje;
import com.wamschool.backend.repository.ICategoria;
import com.wamschool.backend.repository.IObjetoAprendizaje;
import com.wamschool.backend.services.ObjetoAprendizajeServices;

@Service
public class ObjetoAprendizajeServicesImpl implements ObjetoAprendizajeServices {

	@Autowired
	ICategoria catRepo;
	@Autowired
	IObjetoAprendizaje objRepo;
	
	@Override
	@Transactional
	public ObjetoAprendizaje crearObjetoAprendizaje(ObjetoAprendizaje oa) throws Exception {
		ObjetoAprendizaje oar = null;
		if(oa != null) {
			oar = objRepo.save(oa);
		}else {
			throw new Exception("error creando el objeto");
		}
		return oar;
	}

	@Override
	@Transactional
	public ObjetoAprendizaje actualizarObjetoAprendizaje(ObjetoAprendizaje oa) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public void eliminarObjetoAprendizaje(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	@Transactional(readOnly = true)
	public ObjetoAprendizaje buscarObjetoAprendizaje(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional(readOnly = true)
	public List<ObjetoAprendizaje> listarTodosOA() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional(readOnly = true)
	public List<ObjetoAprendizaje> listarOAPorCategorias(List<Categoria> categorias) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional(readOnly = true)
	public List<ObjetoAprendizaje> listarPorAproximacionText(String text) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Categoria extraerCategoria(String nombre) {
		return catRepo.findBynombre(nombre);
	}

	@Override
	public List<Categoria> listarCategorias() {
		List<Categoria> categorias = null;
		categorias = (List<Categoria>) catRepo.findAll();
		return categorias;
	}
	
}
