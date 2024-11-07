package FIXER.FIXER_BE.service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private SecretKey secretKey;
    private long expiration;
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long exp;


    /**
     * Bean이 생성된 이후에 시크릿 키를 초기화하는 메서드.
     */
    @PostConstruct
    public void init() {
        if (secret == null || secret.isEmpty()) {
            throw new IllegalArgumentException("JWT secret cannot be null or empty");
        }
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        this.expiration = exp;
    }
    /**
     * JWT 시크릿 키를 생성자 주입 방식으로 초기화.
     * 보안상의 이유로 환경 변수나 보안 저장소에서 시크릿 키를 불러오는 방식으로 구성.
     *
     * @param secret 환경 변수로부터 받은 Base64 인코딩된 시크릿 키
     */
//    public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
//        System.out.println("secret: " + secret);
//        if (secret == null || secret.isEmpty()) {
//            throw new IllegalArgumentException("JWT secret cannot be null or empty");
//        }
//        byte[] keyBytes = Decoders.BASE64.decode(secret);
//
//        System.out.println("keyBytes: " + keyBytes.length);
//        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
//        this.expiration = expiration;
//    }

    /**
     * 사용자 ID를 이용해 JWT 토큰 생성.
     *
     * @param user_num 토큰에 포함할 사용자 NUM
     * @param user_id 토큰에 포함할 사용자 ID
     * @param user_name 토큰에 포함할 사용자 NAME
     * @return 생성된 JWT 토큰
     */
    public String generateToken(Integer user_num, String user_id, String user_name) {
        return Jwts.builder()
                .claim("user_num", user_num)
                .claim("user_id", user_id)
                .claim("user_name", user_name)
                .claim("iat", new Date().getTime() / 1000)
                .claim("exp", (System.currentTimeMillis() + 1000 * 60 * 60) / 1000) // 1 hour validity
                .signWith(secretKey)
                .compact();
    }

    /**
     * JWT 토큰에서 클레임을 추출.
     *
     * @param token 추출할 JWT 토큰
     * @return 토큰의 클레임 정보
     * @throws SecurityException 유효하지 않은 토큰일 경우 예외 발생
     */
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

    /**
     * 토큰이 유효한지 확인. 사용자 이름과 만료 여부를 체크.
     *
     * @param token 검증할 JWT 토큰
     * @param username 사용자 이름 (검증할 사용자 ID)
     * @return 토큰이 유효하면 true, 그렇지 않으면 false
     */
    public boolean isTokenValid(String token, String username) {
        final String extractedUsername = extractClaims(token).getSubject();
        return (extractedUsername.equals(username) && !isTokenExpired(token));
    }

    /**
     * 토큰이 만료되었는지 확인.
     *
     * @param token 확인할 JWT 토큰
     * @return 토큰이 만료되었으면 true, 그렇지 않으면 false
     */
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    /**
     * 새로 고침 토큰을 생성하는 메서드.
     * 이 메서드는 기존 토큰과 동일한 유효 기간을 가지는 새 토큰을 발급.
     *
     * @param userId 새로 고침 토큰을 발급할 사용자 ID
     * @return 생성된 새로 고침 토큰
     */
    public String generateRefreshToken(String userId) {
        return Jwts.builder()
                .claim("sub", userId)
                .claim("iat", new Date().getTime() / 1000)
                .claim("exp", (System.currentTimeMillis() + 1000 * 60 * 60) / 1000) // 1 hour validity
                .signWith(secretKey)
                .compact();
    }
}
