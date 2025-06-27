package com.bt.authorization.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key SECRET_KEY;

    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.SECRET_KEY = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 horas
    //private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    //private final Key key = Keys.secretKeyFor(SignatureAlgorithm.valueOf("d883614c04d9f673f7b37342c04ddfab0de558f7828502c995193dfd6c44c12fac04aa7cd1076de62a0c8f479f17970430f3f9d6f144041493bf6fa7cda3ec88032c604fb5ee9fbe3ed0eef499a7965a5e8ca77aa3d7de4373c36bec885529fd07b68c9e4ca6de468c45252a4391df215384e20cf597018c1a01d7b8ac6ac76a044ef6e1696f824fff7b7c9b827d4f92e355ae21971a5a1600339608b1a7ba60a5e54aafff5c4b25b463a8d2d0a7e487d3b47b54b54a6dfd30b53041c72a62dea708be745ddfaffe3420e2df10e9b8b3afbb4f77b18be80d216f2c8a72ca38b0e7b5186841f67f657660f250f89fc6f9cb2bfd3cee8baf16294c410227b1f4d8"));

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
