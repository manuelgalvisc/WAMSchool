package com.wamschool.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.wamschool.backend.model.Pagina;


public interface IPagina extends CrudRepository<Pagina,Long>{
	
	@Query("Select p from Pagina p join fetch p.seccion s where s.id =:idSeccion ")
	List<Pagina> listarPaginasPorSeccion(Long idSeccion);

}
