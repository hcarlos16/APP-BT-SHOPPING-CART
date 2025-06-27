package com.app.bt_shopping_cart.mapper;

import com.app.bt_shopping_cart.dto.OrdenProductoDTO;
import com.app.bt_shopping_cart.models.Orden;
import com.app.bt_shopping_cart.models.OrdenProducto;
import com.app.bt_shopping_cart.models.Producto;

public class OrdenProductoMapper {

    public static OrdenProducto toEntity(OrdenProductoDTO dto, Orden orden, Producto producto) {
        return OrdenProducto.builder()
                .orden(orden)
                .producto(producto)
                .cantidad(dto.getCantidad())
                .precioUnitario(dto.getPrecioUnitario())
                .build();
    }

    public static OrdenProductoDTO toDTO(OrdenProducto entidad) {
        return OrdenProductoDTO.builder()
                .ordenId(entidad.getOrden().getId())
                .productoId(entidad.getProducto().getId())
                .cantidad(entidad.getCantidad())
                .precioUnitario(entidad.getPrecioUnitario())
                .build();
    }
}
