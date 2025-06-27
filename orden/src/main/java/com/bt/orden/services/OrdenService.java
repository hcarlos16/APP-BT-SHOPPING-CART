package com.bt.orden.services;

import com.bt.entities.models.Orden;
import com.bt.entities.models.Usuario;
import com.bt.entities.repository.OrdenRepository;
import com.bt.entities.repository.UsuarioRepository;
import com.bt.orden.dto.OrdenDTO;
import com.bt.orden.mapper.OrdenMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrdenService {

    @Autowired
    OrdenRepository ordenRepository;

    @Autowired
    UsuarioRepository usuarioRepository;

    public Orden crearOrden(OrdenDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Orden orden = OrdenMapper.toEntity(dto, usuario);
        return ordenRepository.save(orden);
    }

    public Optional<Orden> obtenerOrden(Integer id) {
        return ordenRepository.findById(id);
    }

    public List<Orden> listarPorUsuario(Integer usuarioId) {
        return ordenRepository.findByUsuarioId(usuarioId);
    }

    public Orden actualizarOrden(Integer id, OrdenDTO dto) {
        return ordenRepository.findById(id).map(orden -> {
            orden.setMontoTotal(dto.getMontoTotal());
            orden.setActivo(dto.getActivo());
            return ordenRepository.save(orden);
        }).orElseThrow(() -> new RuntimeException("Orden no encontrada"));
    }

    public void eliminarOrden(Integer id) {
        ordenRepository.deleteById(id);
    }

    public List<Orden> listarOrdenes() {
        return ordenRepository.findAll();
    }
}
