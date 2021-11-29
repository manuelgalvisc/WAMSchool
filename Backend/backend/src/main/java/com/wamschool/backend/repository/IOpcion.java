package com.wamschool.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wamschool.backend.model.Opcion;

public interface IOpcion extends JpaRepository<Opcion,Long> {

}
