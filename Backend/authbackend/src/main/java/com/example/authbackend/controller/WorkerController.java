package com.example.authbackend.controller;

import com.example.authbackend.model.Worker;
import com.example.authbackend.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to communicate with backend
public class WorkerController {

    @Autowired
    private WorkerRepository workerRepository;

    @PostMapping("/register")
    public Worker registerWorker(@RequestBody Worker worker) {
        return workerRepository.save(worker);
    }

    @GetMapping("/all")
    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }
}


