package com.app.bt_shopping_cart.repository;

import com.app.bt_shopping_cart.models.OrdenProducto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdenProductoRepository extends JpaRepository<OrdenProducto, Integer> {

    List<OrdenProducto> findByOrdenId(Integer ordenId);

}
