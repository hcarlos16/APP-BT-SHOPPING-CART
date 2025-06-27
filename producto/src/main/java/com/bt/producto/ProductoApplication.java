package com.bt.producto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.bt.entities.models")
@EnableJpaRepositories(basePackages = "com.bt.entities.repository")
public class ProductoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductoApplication.class, args);
    }

}
