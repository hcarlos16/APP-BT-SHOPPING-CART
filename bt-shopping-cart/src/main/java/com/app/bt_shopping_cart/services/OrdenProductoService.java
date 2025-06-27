package com.app.bt_shopping_cart.services;

import com.app.bt_shopping_cart.dto.OrdenProductoDTO;
import com.app.bt_shopping_cart.mapper.OrdenProductoMapper;
import com.app.bt_shopping_cart.models.Orden;
import com.app.bt_shopping_cart.models.OrdenProducto;
import com.app.bt_shopping_cart.models.Producto;
import com.app.bt_shopping_cart.repository.OrdenProductoRepository;
import com.app.bt_shopping_cart.repository.OrdenRepository;
import com.app.bt_shopping_cart.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdenProductoService {

    @Autowired
    OrdenProductoRepository ordenProductoRepository;

    @Autowired
    OrdenRepository ordenRepository;

    @Autowired
    ProductoRepository productoRepository;

    public OrdenProducto agregarProductoAOrden(OrdenProductoDTO dto) {
        Orden orden = ordenRepository.findById(dto.getOrdenId())
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        OrdenProducto op = OrdenProductoMapper.toEntity(dto, orden, producto);
        return ordenProductoRepository.save(op);
    }

    public List<OrdenProducto> listarPorOrden(Integer ordenId) {
        return ordenProductoRepository.findByOrdenId(ordenId);
    }

    public void eliminarProductoDeOrden(Integer id) {
        ordenProductoRepository.deleteById(id);
    }
}
