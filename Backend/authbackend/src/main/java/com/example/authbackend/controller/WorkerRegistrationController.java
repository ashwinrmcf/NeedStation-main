//package com.example.authbackend.controller;
//
//import com.example.authbackend.dto.WorkerRegistrationDTO;
//import com.example.authbackend.model.Worker;
//import com.example.authbackend.service.WorkerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/worker")
//@CrossOrigin(origins = "*") // Allow all origins explicitly here
//// DEPRECATED: All logic moved to WorkerController
//public class WorkerRegistrationController {
//
//    private final WorkerService workerService;
//
//    @Autowired
//    public WorkerRegistrationController(WorkerService workerService) {
//        this.workerService = workerService;
//    }
//
//    // Step 1: Basic Information
//    @Autowired
//    private com.fasterxml.jackson.databind.ObjectMapper objectMapper;
//
//    @PostMapping(value = "/register/step1", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> registerStep1(
//            @RequestParam(value = "workerId", required = false) Long workerId,
//            @RequestPart(value = "data", required = true) String data,
//            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture) {
//        try {
//            // Parse JSON string to DTO
//            WorkerRegistrationDTO dto = objectMapper.readValue(data, WorkerRegistrationDTO.class);
//
//            // Log incoming request details
//            System.out.println("Received Step 1 registration request - Worker ID: " + workerId);
//            System.out.println("DTO Data: fullName=" + dto.getFullName() + ", phone=" + dto.getPhone());
//            System.out.println("Profile Picture: " + (profilePicture != null ? "Provided (" + profilePicture.getSize() + " bytes)" : "Not provided"));
//
//            // Process the request
//            Worker worker = workerService.updateBasicInfo(workerId, dto, profilePicture);
//
//            // Prepare response
//            Map<String, Object> response = new HashMap<>();
//            response.put("workerId", worker.getId());
//            response.put("message", "Basic information saved successfully");
//
//            System.out.println("Successfully saved worker basic info. Worker ID: " + worker.getId());
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            // Enhanced error logging
//            System.err.println("Error in registerStep1: " + e.getMessage());
//            e.printStackTrace();
//
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("error", e.getMessage());
//            errorResponse.put("errorType", e.getClass().getSimpleName());
//
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(errorResponse);
//        }
//    }
//
//    // Step 2: Contact Information
//    @PostMapping("/register/step2")
//    public ResponseEntity<?> registerStep2(
//            @RequestParam("workerId") Long workerId,
//            @RequestBody WorkerRegistrationDTO dto) {
//        try {
//            Worker worker = workerService.updateContactInfo(workerId, dto);
//            Map<String, Object> response = new HashMap<>();
//            response.put("workerId", worker.getId());
//            response.put("message", "Contact information saved successfully");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", e.getMessage()));
//        }
//    }
//
//    // Step 3: Professional Details
//    @PostMapping("/register/step3")
//    public ResponseEntity<?> registerStep3(
//            @RequestParam("workerId") Long workerId,
//            @RequestBody WorkerRegistrationDTO dto) {
//        try {
//            Worker worker = workerService.updateProfessionalDetails(workerId, dto);
//            Map<String, Object> response = new HashMap<>();
//            response.put("workerId", worker.getId());
//            response.put("message", "Professional details saved successfully");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", e.getMessage()));
//        }
//    }
//
//    // Step 4: Verification
//    @PostMapping(value = "/register/step4", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> registerStep4(
//            @RequestParam("workerId") Long workerId,
//            @RequestPart("data") WorkerRegistrationDTO dto,
//            @RequestPart(value = "idProof", required = false) MultipartFile idProof,
//            @RequestPart(value = "selfieWithId", required = false) MultipartFile selfieWithId,
//            @RequestPart(value = "certificates", required = false) MultipartFile[] certificates) {
//        try {
//            Worker worker = workerService.updateVerificationDetails(workerId, dto, idProof, selfieWithId, certificates);
//            Map<String, Object> response = new HashMap<>();
//            response.put("workerId", worker.getId());
//            response.put("message", "Verification details saved successfully");
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", e.getMessage()));
//        }
//    }
//
//    // Step 5: Payment Information
//    @PostMapping("/register/step5")
//    public ResponseEntity<?> registerStep5(
//            @RequestParam("workerId") Long workerId,
//            @RequestBody WorkerRegistrationDTO dto) {
//        try {
//            Worker worker = workerService.updatePaymentInfo(workerId, dto);
//            Map<String, Object> response = new HashMap<>();
//            response.put("workerId", worker.getId());
//            response.put("message", "Payment information saved successfully");
//            response.put("status", worker.getRegistrationStatus());
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", e.getMessage()));
//        }
//    }
//
//    // Get all worker information for review page
//    @GetMapping("/details/{workerId}")
//    public ResponseEntity<?> getWorkerDetails(@PathVariable Long workerId) {
//        try {
//            return workerService.getWorkerById(workerId)
//                    .map(ResponseEntity::ok)
//                    .orElse(ResponseEntity.notFound().build());
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", e.getMessage()));
//        }
//    }
//
//    // Final submission
//    @PostMapping("/register/submit")
//    public ResponseEntity<?> finalizeRegistration(@RequestParam("workerId") Long workerId) {
//        try {
//            Worker worker = workerService.finalizeRegistration(workerId);
//            Map<String, Object> response = new HashMap<>();
//            response.put("workerId", worker.getId());
//            response.put("message", "Worker registration completed successfully");
//            response.put("status", worker.getRegistrationStatus());
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", e.getMessage()));
//        }
//    }
//}
