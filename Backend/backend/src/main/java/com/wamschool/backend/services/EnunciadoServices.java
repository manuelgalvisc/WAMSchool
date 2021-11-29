package com.wamschool.backend.services;

import com.wamschool.backend.model.Enunciado;

public interface EnunciadoServices {

	Enunciado crear(Enunciado enunciado);
	
	Enunciado consultarPorID(Long enunciado);
}
