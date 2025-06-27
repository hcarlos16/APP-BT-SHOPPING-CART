package com.bt.orden.services;

import com.bt.entities.models.Orden;
import com.bt.entities.models.OrdenProducto;
import com.bt.entities.models.Producto;
import com.bt.entities.repository.OrdenProductoRepository;
import com.bt.entities.repository.OrdenRepository;
import com.bt.entities.repository.ProductoRepository;
import com.bt.orden.dto.OrdenProductoDTO;
import com.bt.orden.mapper.OrdenProductoMapper;
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
