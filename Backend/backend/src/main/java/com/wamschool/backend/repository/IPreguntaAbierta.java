package com.wamschool.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wamschool.backend.model.PreguntaAbierta;

public interface IPreguntaAbierta extends JpaRepository<PreguntaAbierta,Long> {

}
