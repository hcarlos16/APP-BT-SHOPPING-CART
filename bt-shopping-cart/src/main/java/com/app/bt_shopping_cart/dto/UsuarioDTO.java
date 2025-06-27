package com.app.bt_shopping_cart.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioDTO {

    private String nombre;
    private String apellido;
    private String direccion;
    private String correo;
    private Date fechaNacimiento;
    private String clave;

}
