package FIXER.FIXER_BE.service.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    private final PasswordEncoder passwordEncoder;

    /**
     * 비밀번호 인코딩을 위해 BCryptPasswordEncoder 사용.
     * BCrypt는 보안 강화를 위해 해싱 알고리즘을 여러 번 반복하여 인코딩을 수행.
     */
    public PasswordService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    /**
     * 비밀번호를 인코딩하는 메서드.
     * 입력된 원본 비밀번호를 암호화하여 저장할 수 있는 형태로 변환.
     *
     * @param password 인코딩할 원본 비밀번호
     * @return 인코딩된 비밀번호 문자열
     */
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    /**
     * 비밀번호의 유효성을 확인하는 메서드.
     * 사용자가 입력한 비밀번호와 인코딩된 비밀번호가 일치하는지 검사.
     *
     * @param rawPassword 사용자가 입력한 원본 비밀번호
     * @param encodedPassword 저장된 인코딩된 비밀번호
     * @return 비밀번호가 일치하면 true, 그렇지 않으면 false
     */
    public boolean isPasswordValid(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}