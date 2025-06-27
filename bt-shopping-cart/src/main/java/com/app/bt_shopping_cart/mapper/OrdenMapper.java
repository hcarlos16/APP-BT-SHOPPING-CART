package com.app.bt_shopping_cart.mapper;

import com.app.bt_shopping_cart.dto.OrdenDTO;
import com.app.bt_shopping_cart.models.Orden;
import com.app.bt_shopping_cart.models.Usuario;

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
