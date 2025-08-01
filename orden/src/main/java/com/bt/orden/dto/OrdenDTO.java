package com.bt.orden.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrdenDTO {

    private Integer usuarioId;
    private BigDecimal montoTotal;
    private Boolean activo;
}
