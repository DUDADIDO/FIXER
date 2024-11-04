package FIXER.FIXER_BE.service.security;

import FIXER.FIXER_BE.service.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtUtil jwtUtil;

    public void validateToken(String token, String userId) {
        if (!jwtUtil.isTokenValid(token, userId)) {
            throw new InvalidCredentialsException("Invalid credentials provided");
        }
    }
}