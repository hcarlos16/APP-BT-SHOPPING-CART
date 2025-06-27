package com.bt.authorization.controllers;

import com.bt.authorization.dto.UsuarioDTO;
import com.bt.authorization.services.UsuarioService;
import com.bt.entities.models.Usuario;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;


    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody UsuarioDTO dto) {
        return ResponseEntity.ok(usuarioService.crearUsuario(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Integer id) {
        return ResponseEntity.ok(usuarioService.obtenerUsuario(id));
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Integer id, @RequestBody UsuarioDTO dto) {
        return ResponseEntity.ok(usuarioService.actualizarUsuario(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Integer id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/correo")
    public ResponseEntity<Usuario> obtenerUsuarioPorCorreo(@RequestParam String correo) {
        Usuario usuario = usuarioService.obtenerUsuarioPorCorreo(correo);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
