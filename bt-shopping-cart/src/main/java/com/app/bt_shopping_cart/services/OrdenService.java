package com.app.bt_shopping_cart.services;

import com.app.bt_shopping_cart.dto.OrdenDTO;
import com.app.bt_shopping_cart.mapper.OrdenMapper;
import com.app.bt_shopping_cart.models.Orden;
import com.app.bt_shopping_cart.models.Usuario;
import com.app.bt_shopping_cart.repository.OrdenRepository;
import com.app.bt_shopping_cart.repository.UsuarioRepository;
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
