package com.bt.orden.mapper;

import com.bt.entities.models.Orden;
import com.bt.entities.models.OrdenProducto;
import com.bt.entities.models.Producto;
import com.bt.orden.dto.OrdenProductoDTO;

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
