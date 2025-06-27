package com.bt.producto.mapper;

import com.bt.entities.models.Producto;
import com.bt.producto.dto.ProductoDTO;

public class ProductoMapper {

    public static Producto toEntity(ProductoDTO dto) {
        return Producto.builder()
                .imagen(dto.getImagen())
                .descripcion(dto.getDescripcion())
                .precio(dto.getPrecio())
                .nombre(dto.getNombre())
                .build();
    }

    public static ProductoDTO toDTO(Producto producto) {
        return ProductoDTO.builder()
                .imagen(producto.getImagen())
                .descripcion(producto.getDescripcion())
                .precio(producto.getPrecio())
                .nombre(producto.getNombre())
                .build();
    }
}
