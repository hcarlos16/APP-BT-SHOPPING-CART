package com.app.bt_shopping_cart.repository;

import com.app.bt_shopping_cart.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}
