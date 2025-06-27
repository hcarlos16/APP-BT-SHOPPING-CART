package com.app.bt_shopping_cart.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombre;

    private String apellido;

    @Column(columnDefinition = "TEXT")
    private String direccion;

    @Column(unique = true, nullable = false)
    private String correo;

    @Column(name = "fecha_nacimiento")
    private Date fechaNacimiento;

    private String clave; // Aquí deberías usar BCrypt para el hash

    @Column(name = "fecha_creacion", updatable = false)
    private Date fechaCreacion;

    @Column(name = "fecha_actualizacion")
    private Date fechaActualizacion;


}
