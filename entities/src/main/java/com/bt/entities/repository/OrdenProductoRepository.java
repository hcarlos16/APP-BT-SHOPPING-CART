package com.bt.entities.repository;

import com.bt.entities.models.OrdenProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdenProductoRepository extends JpaRepository<OrdenProducto, Integer> {

    List<OrdenProducto> findByOrdenId(Integer ordenId);
}
