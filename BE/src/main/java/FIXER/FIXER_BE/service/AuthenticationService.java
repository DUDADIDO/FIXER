package FIXER.FIXER_BE.service;

import FIXER.FIXER_BE.service.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtUtil jwtUtil;

    public void validateToken(String token, String username) {
        if (!jwtUtil.isTokenValid(token, username)) {
            throw new SecurityException("Invalid JWT token");
        }
    }
}