package com.bt.orden;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.bt.entities.models")
@EnableJpaRepositories(basePackages = "com.bt.entities.repository")
public class OrdenApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrdenApplication.class, args);
	}

}
