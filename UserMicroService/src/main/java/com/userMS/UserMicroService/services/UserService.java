package com.userMS.UserMicroService.services;

import com.userMS.UserMicroService.dtos.AuthRequestDTO;
import com.userMS.UserMicroService.dtos.AuthResponseDTO;
import com.userMS.UserMicroService.dtos.RegisterRequestDTO;
import com.userMS.UserMicroService.entities.Role;
import com.userMS.UserMicroService.entities.User;
import com.userMS.UserMicroService.jwt.JwtService;
import com.userMS.UserMicroService.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        var user = User.builder()
                .firstName(registerRequestDTO.getFirstName())
                .secondName(registerRequestDTO.getSecondName())
                .email(registerRequestDTO.getEmail())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .role(Role.USER)
                .build();
        this.userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponseDTO login(AuthRequestDTO authRequestDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
        );
        var user = this.userRepository.findByEmail(authRequestDTO.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .build();
    }
}
