package com.app.bt_shopping_cart.repository;

import com.app.bt_shopping_cart.models.Orden;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdenRepository extends JpaRepository<Orden, Integer> {

    List<Orden> findByUsuarioId(Integer usuarioId);

}
