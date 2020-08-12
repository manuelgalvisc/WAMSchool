package com.wamschool.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wamschool.backend.model.OpcionMultiple;

public interface IOpcionMultiple extends JpaRepository<OpcionMultiple,Long> {
	
}
