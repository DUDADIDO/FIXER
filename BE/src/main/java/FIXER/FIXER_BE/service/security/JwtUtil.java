package FIXER.FIXER_BE.service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private SecretKey secretKey;

    // Secret key is injected via configuration, which can be sourced from a secure vault or environment variable
    public JwtUtil(@Value("${jwt.secret}") String secret) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String userId) {
        return Jwts.builder()
                .claim("sub", userId)
                .claim("iat", new Date().getTime() / 1000)
                .claim("exp", (System.currentTimeMillis() + 1000 * 60 * 60) / 1000) // 1 hour validity
                .signWith(secretKey)
                .compact();
    }

    public Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (Exception e) {
            throw new SecurityException("Invalid JWT token", e);
        }
    }

    public boolean isTokenValid(String token, String username) {
        final String extractedUsername = extractClaims(token).getSubject();
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Method for generating a refresh token
    public String generateRefreshToken(String userId) {
        return Jwts.builder()
                .claim("sub", userId)
                .claim("iat", new Date().getTime() / 1000)
                .claim("exp", (System.currentTimeMillis() + 1000 * 60 * 60) / 1000) // 1 hour validity
                .signWith(secretKey)
                .compact();
    }
}
