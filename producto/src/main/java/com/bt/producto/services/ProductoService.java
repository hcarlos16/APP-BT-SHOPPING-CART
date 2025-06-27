package com.bt.producto.services;

import com.bt.entities.models.Producto;
import com.bt.entities.repository.ProductoRepository;
import com.bt.producto.dto.ProductoDTO;
import com.bt.producto.mapper.ProductoMapper;
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
            producto.setNombre(dto.getNombre());
            return productoRepository.save(producto);
        }).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }


}
