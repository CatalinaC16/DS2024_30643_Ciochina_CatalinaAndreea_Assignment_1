package com.userMS.UserMicroService.controllers;

import com.userMS.UserMicroService.dtos.AuthRequestDTO;
import com.userMS.UserMicroService.dtos.AuthResponseDTO;
import com.userMS.UserMicroService.dtos.RegisterRequestDTO;
import com.userMS.UserMicroService.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO registerRequestDTO) {
        return ResponseEntity.ok(this.userService.register(registerRequestDTO));
    }

    @PostMapping("/auth")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequestDTO) {
        return ResponseEntity.ok(this.userService.login(authRequestDTO));
    }
}
