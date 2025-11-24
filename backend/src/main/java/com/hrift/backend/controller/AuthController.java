package com.hrift.backend.controller;

import com.hrift.backend.dto.LoginRequest;
import com.hrift.backend.dto.RegisterRequest;
import com.hrift.backend.entities.User;
import com.hrift.backend.mapper.UserMapper;
import com.hrift.backend.models.LoginResponse;
import com.hrift.backend.repository.UserRepository;
import com.hrift.backend.security.JwtService;
import com.hrift.backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final JwtService jwtService;
    private final AuthService authService;
    private final UserRepository userRepository;


    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterRequest registerRequest){
        User registeredUser = authService.register(registerRequest);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        var loginUser = authService.login(loginRequest);
        String jwtToken = jwtService.generateToken(loginUser);

        ResponseCookie cookie = ResponseCookie.from("jwt", jwtToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .path("/")
                .maxAge(jwtService.getExpirationTime() / 1000)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());


        return ResponseEntity.ok(Map.of("message","Connexion réussie"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){

        ResponseCookie cookie = ResponseCookie.from("jwt","")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader("set-Cookie", cookie.toString());

        return ResponseEntity.ok(Map.of("message", "Déconnexion réussie"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CookieValue(name = "jwt", required = false) String jwt) {
        if (jwt == null || jwt.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Utilisateur non connecté"));
        }

        String email;
        try {
            email = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "JWT invalide"));
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));

        return ResponseEntity.ok(UserMapper.toProfileDTO(user));
    }
}
