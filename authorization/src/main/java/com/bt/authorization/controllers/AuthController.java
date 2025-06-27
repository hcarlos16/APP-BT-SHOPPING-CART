package com.bt.authorization.controllers;


import com.bt.authorization.security.JwtUtil;
import com.bt.authorization.security.UsuarioDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    private final UsuarioDetailsService usuarioDetailsService;

    @PostMapping("/login")
    public String login(@RequestParam String correo, @RequestParam String clave) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(correo, clave));
        UserDetails userDetails = usuarioDetailsService.loadUserByUsername(correo);
        return jwtUtil.generateToken(userDetails.getUsername());
    }

    @PostMapping("/validate-token")
    public ResponseEntity<String> validateToken(@RequestParam String token) {
        try {
            boolean isValid = jwtUtil.validateToken(token);
            if (isValid) {
                return ResponseEntity.ok("El token es válido y está activo.");
            } else {
                return ResponseEntity.status(401).body("El token no es válido o está inactivo.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error al validar el token: " + e.getMessage());
        }
    }
}
