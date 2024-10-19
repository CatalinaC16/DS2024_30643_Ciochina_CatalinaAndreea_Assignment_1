package com.example.deviceMS.services;

import com.example.deviceMS.dtos.mappers.UserMapper;
import com.example.deviceMS.dtos.userDTOs.UserDTO;
import com.example.deviceMS.entities.Device;
import com.example.deviceMS.entities.User;
import com.example.deviceMS.exceptions.DeviceDoesNotExistException;
import com.example.deviceMS.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    public UserDTO createUser(UserDTO userDTO) {
        User user = this.userMapper.convertToEntity(userDTO);
        user = this.userRepository.save(user);
        return this.userMapper.convertToDTO(user);
    }

    public String deleteUser(UUID id){
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isEmpty()) {
            logger.error("User with id={} was not found", id);
            throw new DeviceDoesNotExistException("The requested device does not exist");
        }
        User user = userOptional.get();
        this.userRepository.delete(user);
        logger.info("User with id={} was deleted", id);
        return "User with id= " + id + " was deleted successfully!";
    }
}
