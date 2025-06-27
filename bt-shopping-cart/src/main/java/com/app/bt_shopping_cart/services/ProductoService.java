package com.app.bt_shopping_cart.services;


import com.app.bt_shopping_cart.dto.ProductoDTO;
import com.app.bt_shopping_cart.mapper.ProductoMapper;
import com.app.bt_shopping_cart.models.Producto;
import com.app.bt_shopping_cart.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    @Autowired
    ProductoRepository productoRepository;

    public Producto crearProducto(ProductoDTO dto) {
        Producto producto = ProductoMapper.toEntity(dto);
        return productoRepository.save(producto);
    }

    public Optional<Producto> obtenerProducto(Integer id) {
        return productoRepository.findById(id);
    }

    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }


    public Producto actualizarProducto(Integer id, ProductoDTO dto) {
        return productoRepository.findById(id).map(producto -> {
            producto.setImagen(dto.getImagen());
            producto.setDescripcion(dto.getDescripcion());
            producto.setPrecio(dto.getPrecio());
            return productoRepository.save(producto);
        }).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }



}
