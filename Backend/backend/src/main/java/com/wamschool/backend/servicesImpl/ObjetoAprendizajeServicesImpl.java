package com.wamschool.backend.servicesImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wamschool.backend.model.Categoria;
import com.wamschool.backend.model.ObjetoAprendizaje;
import com.wamschool.backend.model.Seccion;
import com.wamschool.backend.repository.ICategoria;
import com.wamschool.backend.repository.IObjetoAprendizaje;
import com.wamschool.backend.repository.ISeccion;
import com.wamschool.backend.services.ObjetoAprendizajeServices;

@Service
public class ObjetoAprendizajeServicesImpl implements ObjetoAprendizajeServices {

	@Autowired
	ICategoria catRepo;
	@Autowired
	IObjetoAprendizaje objRepo;
	@Autowired
	ISeccion repoSeccion;
	
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
		return objRepo.saveAndFlush(oa);
	}

	@Override
	@Transactional
	public void eliminarObjetoAprendizaje(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	@Transactional(readOnly = true)
	public ObjetoAprendizaje buscarObjetoAprendizaje(Long id) {
		return objRepo.findById(id).orElse(null);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ObjetoAprendizaje> listarTodosOA() {
		List<ObjetoAprendizaje> listaOA = new ArrayList<ObjetoAprendizaje>();
		listaOA = objRepo.findAll();
		return listaOA;
	}

	@Override
	@Transactional(readOnly = true)
	public Page<ObjetoAprendizaje> listarOAPorCategorias(List<Categoria> categorias,Pageable pageable) {
		Page<ObjetoAprendizaje> pagina = null;
		pagina = objRepo.findAllByCategoriasIn(categorias, pageable);
		return pagina;
	}

	@Override
	@Transactional(readOnly = true)
	public Page<ObjetoAprendizaje> listarPorAproximacionText(String text,Pageable pageable) {
		Page<ObjetoAprendizaje> OAaproximados = objRepo.findByTituloOAContainingIgnoreCaseOrDescripcionContainingIgnoreCase(text,text, pageable);
		return OAaproximados;
	}

	@Override
	@Transactional(readOnly = true)
	public Categoria extraerCategoria(String nombre) {
		return catRepo.findBynombre(nombre);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Categoria> listarCategorias() {
		List<Categoria> categorias = null;
		categorias = (List<Categoria>) catRepo.findAll();
		return categorias;
	}

	@Override
	@Transactional(readOnly = true)
	public Page<ObjetoAprendizaje> paginaListaOA(Pageable pageable) {
		Page<ObjetoAprendizaje> pageOA =  null;
		pageOA = objRepo.findAll(pageable);
		return pageOA;
	}

	
	
	
}
