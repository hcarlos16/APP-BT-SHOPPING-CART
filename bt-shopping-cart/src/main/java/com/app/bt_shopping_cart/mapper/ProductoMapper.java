package com.app.bt_shopping_cart.mapper;

import com.app.bt_shopping_cart.dto.ProductoDTO;
import com.app.bt_shopping_cart.models.Producto;

public class ProductoMapper {

    public static Producto toEntity(ProductoDTO dto) {
        return Producto.builder()
                .imagen(dto.getImagen())
                .descripcion(dto.getDescripcion())
                .precio(dto.getPrecio())
                .build();
    }

    public static ProductoDTO toDTO(Producto producto) {
        return ProductoDTO.builder()
                .imagen(producto.getImagen())
                .descripcion(producto.getDescripcion())
                .precio(producto.getPrecio())
                .build();
    }
}
