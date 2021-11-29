package com.wamschool.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.wamschool.backend.model.Archivo;


public interface IArchivo extends CrudRepository<Archivo,Long> {
	
	@Query("Select a from Archivo a join fetch a.pagina p where p.id =:idPagina ")
	List<Archivo> listarArchivosPorIdPagina(Long idPagina);
}
