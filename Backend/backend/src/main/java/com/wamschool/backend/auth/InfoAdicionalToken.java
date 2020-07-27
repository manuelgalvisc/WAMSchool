package com.wamschool.backend.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import com.wamschool.backend.model.Usuario;
import com.wamschool.backend.services.LoginServices;

//Información adicional al token
@SuppressWarnings("deprecation")
@Component
public class InfoAdicionalToken implements TokenEnhancer {

	@Autowired
	private LoginServices usuarioService;
	
	@Override
	public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
		Usuario usuario = usuarioService.findByEmail(authentication.getName());
		Map<String, Object> info = new HashMap<>();
		info.put("info_adicional", "Hola que tal!".concat(authentication.getName()));
		
		info.put("nombre_usuario", usuario.getNombre());
		info.put("apellido_usuario", usuario.getApellido());
		
		((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
		
		return accessToken;
	}
	
}
