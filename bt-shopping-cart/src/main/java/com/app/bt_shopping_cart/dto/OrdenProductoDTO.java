package com.app.bt_shopping_cart.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdenProductoDTO {
    private Integer ordenId;
    private Integer productoId;
    private Integer cantidad;
    private BigDecimal precioUnitario;
}
