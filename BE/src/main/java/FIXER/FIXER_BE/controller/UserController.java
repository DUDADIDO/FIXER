package FIXER.FIXER_BE.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            throw new RuntimeException("User is not authenticated");
        }

        // 필요한 속성만 선택하여 반환6we
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("username", principal.getAttribute("name"));
        userInfo.put("email", principal.getAttribute("email"));
        System.out.println(userInfo);
        return userInfo;
    }
}
