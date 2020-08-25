package com.wamschool.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wamschool.backend.model.ParejaItem;


/**
 * Interface que se encarga de implementar el modelo DAO JPA
 * @author wman
 *
 */
public interface IParejaItem extends JpaRepository<ParejaItem,Long> {

}
