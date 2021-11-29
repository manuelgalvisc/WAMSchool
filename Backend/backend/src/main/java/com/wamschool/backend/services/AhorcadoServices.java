package com.wamschool.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Ahorcado;


public interface AhorcadoServices {
	public List<Ahorcado>listarAhorcadosPorIdSeccion(Long idSeccion);
	public Ahorcado guardarAhorcado(Ahorcado ahorcado);
	public Ahorcado buscarAhorcado(Long idAhorcado);
}
