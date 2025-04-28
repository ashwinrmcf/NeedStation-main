package com.example.authbackend.controller;

import com.example.authbackend.dto.LocationDTO;
import com.example.authbackend.model.User;
import com.example.authbackend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/update-location")
    public ResponseEntity<?> updateLocation(@RequestBody LocationDTO locationDTO) {
        Optional<User> optionalUser = userRepository.findByEmail(locationDTO.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        User user = optionalUser.get();
        user.setLocationLat(locationDTO.getLat());
        user.setLocationLng(locationDTO.getLng());
        user.setLocationAddress(locationDTO.getAddress());

        userRepository.save(user);

        return ResponseEntity.ok("Location updated successfully");
    }
}
