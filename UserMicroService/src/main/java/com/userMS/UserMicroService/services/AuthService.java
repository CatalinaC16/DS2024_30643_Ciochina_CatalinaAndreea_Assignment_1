package com.userMS.UserMicroService.services;

import com.userMS.UserMicroService.dtos.authDTOs.AuthRequestDTO;
import com.userMS.UserMicroService.dtos.authDTOs.AuthResponseDTO;
import com.userMS.UserMicroService.dtos.authDTOs.RegisterRequestDTO;
import com.userMS.UserMicroService.dtos.mappers.AuthMapper;
import com.userMS.UserMicroService.entities.User;
import com.userMS.UserMicroService.jwt.JwtService;
import com.userMS.UserMicroService.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final AuthMapper authMapper;

    public AuthResponseDTO register(RegisterRequestDTO registerRequestDTO) {
        User user = this.authMapper.convertToEntity(registerRequestDTO);
        this.userRepository.save(user);
        String jwtToken = jwtService.generateToken(user);
        return this.authMapper.convertToDTOResp(jwtToken);
    }

    public AuthResponseDTO login(AuthRequestDTO authRequestDTO) {
        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequestDTO.getEmail(), authRequestDTO.getPassword())
        );
        User user = this.userRepository.findByEmail(authRequestDTO.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return this.authMapper.convertToDTOResp(jwtToken);
    }
}
