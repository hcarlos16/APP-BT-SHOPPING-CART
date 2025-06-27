package com.app.bt_shopping_cart.controllers;

import com.app.bt_shopping_cart.dto.OrdenDTO;
import com.app.bt_shopping_cart.models.Orden;
import com.app.bt_shopping_cart.services.OrdenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordenes")
@RequiredArgsConstructor

public class OrdenController {

    @Autowired
    OrdenService ordenService;

    @PostMapping
    public ResponseEntity<Orden> crearOrden(@RequestBody OrdenDTO dto) {
        return ResponseEntity.ok(ordenService.crearOrden(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orden> obtenerOrden(@PathVariable Integer id) {
        return ordenService.obtenerOrden(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Orden>> listarOrdenes() {
        return ResponseEntity.ok(ordenService.listarOrdenes());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Orden>> listarPorUsuario(@PathVariable Integer usuarioId) {
        return ResponseEntity.ok(ordenService.listarPorUsuario(usuarioId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orden> actualizarOrden(@PathVariable Integer id, @RequestBody OrdenDTO dto) {
        return ResponseEntity.ok(ordenService.actualizarOrden(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOrden(@PathVariable Integer id) {
        ordenService.eliminarOrden(id);
        return ResponseEntity.noContent().build();
    }

}
