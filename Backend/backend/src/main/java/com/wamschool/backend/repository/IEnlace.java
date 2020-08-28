package com.wamschool.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.wamschool.backend.model.Archivo;
import com.wamschool.backend.model.Enlace;

public interface IEnlace extends CrudRepository<Enlace,Long>{
	@Query("Select e from Enlace e join fetch e.pagina p where p.id =:idPagina ")
	List<Enlace> listarArchivosPorIdPagina(Long idPagina);
}
