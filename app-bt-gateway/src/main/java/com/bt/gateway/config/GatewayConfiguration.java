package com.bt.gateway.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import reactor.core.publisher.Mono;

@Configuration
@Slf4j
public class GatewayConfiguration {



    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("user-path", r -> r.path("/api/usuarios/**")
                        .filters(f -> f.filter((exchange, chain) -> {
                            exchange.getRequest().mutate()
                                    .header("Authorization", exchange.getRequest().getHeaders().getFirst("Authorization"));
                            return chain.filter(exchange);
                        }))
                        .uri("http://localhost:8081"))

                .route("auth-path", r -> r.path("/api/auth/**")
                        .uri("http://localhost:8081"))
                .route("cart-path", r -> r.path("/api/ordenes/**")
                        .uri("http://localhost:8083"))
                .route("product-path", r -> r.path("/api/productos/**")
                        .uri("http://localhost:8082"))
                .route("orden-product-path", r -> r.path("/api/orden-producto/**")
                        .uri("http://localhost:8083"))
                .build();
    }

    @Bean
    @Order(-1)
    public GlobalFilter logRequestFilter() {
        return (exchange, chain) -> {
            log.info("Request path is ----> {}", exchange.getRequest().getPath());
            log.info("Headers  {}", exchange.getRequest().getPath());

            exchange.getRequest().getHeaders().forEach((key, value) -> {


                log.info("{} : {}", key, value);
            });
            return chain.filter(exchange).then(Mono.fromRunnable(() -> {
                log.info("Request completed.");
            }));
        };
    }
}
