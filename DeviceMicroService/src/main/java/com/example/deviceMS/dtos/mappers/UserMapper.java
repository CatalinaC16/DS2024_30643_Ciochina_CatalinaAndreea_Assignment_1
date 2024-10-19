package com.example.deviceMS.dtos.mappers;

import com.example.deviceMS.dtos.userDTOs.UserDTO;
import com.example.deviceMS.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<User, UserDTO> {

    @Override
    public UserDTO convertToDTO(User user) {
        if (user != null) {
            return UserDTO.builder()
                    .id(user.getId())
                    .devices(user.getDevices())
                    .build();
        }
        return null;
    }

    @Override
    public User convertToEntity(UserDTO userDTO) {
        if (userDTO != null) {
            return User.builder()
                    .id(userDTO.getId())
                    .devices(userDTO.getDevices())
                    .build();
        }
        return null;
    }
}
