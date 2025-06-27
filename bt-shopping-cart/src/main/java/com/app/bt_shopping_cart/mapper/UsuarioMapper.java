package com.app.bt_shopping_cart.mapper;

import com.app.bt_shopping_cart.dto.UsuarioDTO;
import com.app.bt_shopping_cart.models.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UsuarioMapper {


    public static Usuario toEntity(UsuarioDTO dto) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


        return Usuario.builder()
                .nombre(dto.getNombre())
                .apellido(dto.getApellido())
                .direccion(dto.getDireccion())
                .correo(dto.getCorreo())
                .fechaNacimiento(dto.getFechaNacimiento())
                .clave(encodePassword(dto.getClave()))
                .build();
    }

    public static UsuarioDTO toDTO(Usuario usuario) {
        return UsuarioDTO.builder()
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .direccion(usuario.getDireccion())
                .correo(usuario.getCorreo())
                .fechaNacimiento(usuario.getFechaNacimiento())
                .clave(usuario.getClave())
                .build();
    }

    public static String encodePassword(String rawPassword) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(rawPassword);
    }
}
