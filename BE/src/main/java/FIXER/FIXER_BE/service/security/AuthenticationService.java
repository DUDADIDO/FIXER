package FIXER.FIXER_BE.service.security;

import FIXER.FIXER_BE.service.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtUtil jwtUtil;

    /**
     * 주어진 토큰이 특정 사용자 ID에 대해 유효한지 검사하는 함수.
     * 유효하지 않으면 InvalidCredentialsException 예외를 발생시킴.
     *
     * @param token 검증할 JWT 토큰
     * @param userId 검증할 사용자 ID
     **/
    public void validateToken(String token, String userId) {
        if (!jwtUtil.isTokenValid(token, userId)) {
            throw new InvalidCredentialsException("Invalid credentials provided");
        }
    }
}