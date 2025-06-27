package com.app.bt_shopping_cart.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "orden")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Orden {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "monto_total", precision = 10, scale = 2)
    private BigDecimal montoTotal = BigDecimal.ZERO;

    @Column(name = "fecha_creacion", updatable = false)
    private Date fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private Date fechaActualizacion;

    @Column
    private Boolean activo = false;


}
