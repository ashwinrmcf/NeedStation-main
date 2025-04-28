package com.example.authbackend.service;

import com.example.authbackend.model.Worker;
import com.example.authbackend.repository.WorkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerService {

    @Autowired
    private WorkerRepository workerRepository;

    public Worker registerWorker(Worker worker) {
        System.out.println("Saving Worker: " + worker); // Debugging output

        return workerRepository.save(worker);
    }

    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }
}

