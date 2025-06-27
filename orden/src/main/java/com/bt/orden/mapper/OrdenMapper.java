package com.bt.orden.mapper;

import com.bt.entities.models.Orden;
import com.bt.entities.models.Usuario;
import com.bt.orden.dto.OrdenDTO;

public class OrdenMapper {

    public static Orden toEntity(OrdenDTO dto, Usuario usuario) {
        return Orden.builder()
                .usuario(usuario)
                .montoTotal(dto.getMontoTotal())
                .activo(dto.getActivo())
                .build();
    }

    public static OrdenDTO toDTO(Orden orden) {
        return OrdenDTO.builder()
                .usuarioId(orden.getUsuario().getId())
                .montoTotal(orden.getMontoTotal())
                .activo(orden.getActivo())
                .build();
    }
}
