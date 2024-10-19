package com.example.deviceMS.controllers;

import com.example.deviceMS.services.DeviceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/device")
@RequiredArgsConstructor
public class DeviceController {

    private final DeviceService deviceService;

    @GetMapping("/hello")
    public ResponseEntity<String> helloDevices() {
        return ResponseEntity.ok("Hello, Devices!");
    }

}
