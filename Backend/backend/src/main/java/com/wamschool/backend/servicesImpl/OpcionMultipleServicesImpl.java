package com.wamschool.backend.servicesImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.OpcionMultiple;
import com.wamschool.backend.repository.IOpcionMultiple;
import com.wamschool.backend.services.OpcionMultipleServices;

@Service
public class OpcionMultipleServicesImpl implements OpcionMultipleServices {

	@Autowired
	IOpcionMultiple opmulRepo;
	
	@Override
	public OpcionMultiple crear(OpcionMultiple opcionMultiple) {

		return opmulRepo.save(opcionMultiple);
	}

	
}
