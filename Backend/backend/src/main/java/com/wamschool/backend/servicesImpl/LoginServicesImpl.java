package com.wamschool.backend.servicesImpl;

import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wamschool.backend.model.Role;
import com.wamschool.backend.model.Usuario;
import com.wamschool.backend.repository.IRole;
import com.wamschool.backend.repository.IUsuario;
import com.wamschool.backend.services.LoginServices;

@Service
public class LoginServicesImpl implements LoginServices, UserDetailsService {
	private Logger logger = LoggerFactory.getLogger(LoginServices.class);
		
	@Autowired
	IRole roleRepo;
	@Autowired
	IUsuario usuRepo;
	
	@Override
	@Transactional
	public void agregarRole(Role role) {
		roleRepo.save(role);
	}

	@Override
	@Transactional
	public Usuario registrarUsuario(Usuario user) {
		return usuRepo.save(user);
	}

	@Override
	@Transactional
	public Usuario autenticarUsuario(String email) {
		return usuRepo.findByEmail(email);
	}

	@Override
	@Transactional(readOnly = true)
	public Role extraerRole(String name) {
		
		return roleRepo.findByName(name);
	}

	@Override
	public Boolean containsEmailUser(String email) {
		return usuRepo.existsUsuarioByEmail(email);
	}

	//Metodo de retorno de detalles de un usuario.
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Usuario usuario = usuRepo.findByEmail(email);
		
		if(usuario == null) {
			logger.error("Error en el login: no existe el usuario '"+email+"' en el sistema!");
			throw new UsernameNotFoundException("Error en el login: no existe el usuario '"+email+"' en el sistema!");
		}
		
		List<GrantedAuthority> autorities = usuario.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName()))
				.peek(authority -> logger.info("Role: " + authority.getAuthority()))
				.collect(Collectors.toList());
		
		return new User(usuario.getEmail(), usuario.getPassword(), usuario.getEnabled(), true, true, true, autorities);
	}

	@Override
	@Transactional(readOnly = true)
	public Usuario findByEmail(String email) {
		return usuRepo.findByEmail(email);
	}

	
}
