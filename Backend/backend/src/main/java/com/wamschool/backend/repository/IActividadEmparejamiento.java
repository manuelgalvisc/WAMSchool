package com.wamschool.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wamschool.backend.model.ActividadEmparejamiento;

/**
 * Interface que se encarga de impelmentar em modelo DAO JPA
 * @author wman 
 *
 */
public interface IActividadEmparejamiento extends JpaRepository<ActividadEmparejamiento,Long> {

}
