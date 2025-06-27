package com.app.bt_shopping_cart.services;

import com.app.bt_shopping_cart.dto.UsuarioDTO;
import com.app.bt_shopping_cart.mapper.UsuarioMapper;
import com.app.bt_shopping_cart.models.Usuario;
import com.app.bt_shopping_cart.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario crearUsuario(UsuarioDTO dto) {
        Usuario usuario = UsuarioMapper.toEntity(dto);
        usuario.setFechaCreacion(new Date());
        usuario.setFechaActualizacion(new Date());
        return usuarioRepository.save(usuario);
    }

    public Usuario obtenerUsuario(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario actualizarUsuario(Integer id, UsuarioDTO dto) {
        return usuarioRepository.findById(id).map(usuario -> {
            usuario.setNombre(dto.getNombre());
            usuario.setApellido(dto.getApellido());
            usuario.setDireccion(dto.getDireccion());
            usuario.setCorreo(dto.getCorreo());
            usuario.setFechaNacimiento(dto.getFechaNacimiento());
            usuario.setClave(dto.getClave());
            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public void eliminarUsuario(Integer id) {
        usuarioRepository.deleteById(id);
    }


}
