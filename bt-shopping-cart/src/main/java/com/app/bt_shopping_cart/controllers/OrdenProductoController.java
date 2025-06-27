package com.app.bt_shopping_cart.controllers;


import com.app.bt_shopping_cart.dto.OrdenProductoDTO;
import com.app.bt_shopping_cart.models.OrdenProducto;
import com.app.bt_shopping_cart.services.OrdenProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orden-producto")
@RequiredArgsConstructor
public class OrdenProductoController {

    @Autowired
    OrdenProductoService ordenProductoService;


    @PostMapping
    public ResponseEntity<OrdenProducto> agregarProducto(@RequestBody OrdenProductoDTO dto) {
        return ResponseEntity.ok(ordenProductoService.agregarProductoAOrden(dto));
    }

    @GetMapping("/orden/{ordenId}")
    public ResponseEntity<List<OrdenProducto>> listarProductosDeOrden(@PathVariable Integer ordenId) {
        return ResponseEntity.ok(ordenProductoService.listarPorOrden(ordenId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Integer id) {
        ordenProductoService.eliminarProductoDeOrden(id);
        return ResponseEntity.noContent().build();
    }
}
