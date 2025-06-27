package com.app.bt_shopping_cart.repository;

import com.app.bt_shopping_cart.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    public Optional<Usuario> findByCorreo(String correo);


}
