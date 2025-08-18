package com.example.authbackend.controller;


import com.example.authbackend.dto.WorkerDTO;
import com.example.authbackend.dto.WorkerRegistrationDTO;
import com.example.authbackend.model.Worker;
import com.example.authbackend.service.WorkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/worker")
@CrossOrigin(origins = "*") // Allow all origins explicitly here
public class WorkerController {

    // Worker login endpoint - updated to support OTP verification
    @PostMapping("/login")
    public ResponseEntity<?> loginWorker(@RequestBody com.example.authbackend.dto.WorkerLoginDTO loginDTO) {
        try {
            // If verified flag is true, we can skip email check and authenticate by workerId
            if (loginDTO.isVerified() && loginDTO.getWorkerId() != null) {
                Optional<Worker> workerOpt = workerService.getWorkerById(loginDTO.getWorkerId());
                if (workerOpt.isPresent() && workerOpt.get().getPhone().equals(loginDTO.getPhone())) {
                    Worker worker = workerOpt.get();
                    Map<String, Object> response = new HashMap<>();
                    response.put("workerId", worker.getId());
                    response.put("fullName", worker.getFullName());
                    response.put("email", worker.getEmail());
                    response.put("phone", worker.getPhone());
                    response.put("message", "Login successful");
                    return ResponseEntity.ok(response);
                }
            }
            
            // Fall back to regular email/phone authentication if OTP verification not used
            java.util.Optional<Worker> workerOpt = workerService.authenticateWorker(loginDTO.getEmail(), loginDTO.getPhone());
            if (workerOpt.isPresent()) {
                Worker worker = workerOpt.get();
                // You can customize the returned fields as needed
                Map<String, Object> response = new HashMap<>();
                response.put("workerId", worker.getId());
                response.put("fullName", worker.getFullName());
                response.put("email", worker.getEmail());
                response.put("phone", worker.getPhone());
                response.put("message", "Login successful");
                return ResponseEntity.ok(response);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    // Find worker by phone number (for OTP login verification)
    @GetMapping("/findByPhone/{phone}")
    public ResponseEntity<?> findWorkerByPhone(@PathVariable String phone) {
        try {
            java.util.Optional<Worker> workerOpt = workerService.findWorkerByPhone(phone);
            if (workerOpt.isPresent()) {
                Worker worker = workerOpt.get();
                Map<String, Object> response = new HashMap<>();
                response.put("workerId", worker.getId());
                response.put("found", true);
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> error = new HashMap<>();
                error.put("found", false);
                error.put("message", "No worker found with this phone number");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @Autowired
    private com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    private final WorkerService workerService;

    @Autowired
    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    // Step 1: Basic Information
    @PostMapping(value = "/register/step1", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registerStep1(
            @RequestParam(value = "workerId", required = false) Long workerId,
            @RequestPart(value = "data", required = true) String data,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture) {
        try {
            // Parse the JSON string directly
            WorkerRegistrationDTO dto = objectMapper.readValue(data, WorkerRegistrationDTO.class);
            System.out.println("Received Step 1 registration request - Worker ID: " + workerId);
            System.out.println("DTO Data: fullName=" + dto.getFullName() + ", phone=" + dto.getPhone());
            System.out.println("Profile Picture: " + (profilePicture != null ? "Provided (" + profilePicture.getSize() + " bytes)" : "Not provided"));
            Worker worker = workerService.updateBasicInfo(workerId, dto, profilePicture);
            Map<String, Object> response = new HashMap<>();
            response.put("workerId", worker.getId());
            response.put("message", "Basic information saved successfully");
            System.out.println("Successfully saved worker basic info. Worker ID: " + worker.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error in registerStep1: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // Step 2: Contact Information
    @PostMapping("/register/step2")
    public ResponseEntity<?> registerStep2(
            @RequestParam("workerId") Long workerId,
            @RequestBody WorkerRegistrationDTO dto) {
        try {
            System.out.println("Received Step 2 registration request - Worker ID: " + workerId);
            System.out.println("Contact info: city=" + dto.getCity() + ", serviceAreas=" + dto.getServiceAreas());
            
            Worker worker = workerService.updateContactInfo(workerId, dto);
            Map<String, Object> response = new HashMap<>();
            response.put("workerId", worker.getId());
            response.put("message", "Contact information saved successfully");
            
            System.out.println("Successfully saved worker contact info. Worker ID: " + worker.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error in registerStep2: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // Step 3: Professional Details
    @PostMapping("/register/step3")
    public ResponseEntity<?> registerStep3(
            @RequestParam("workerId") Long workerId,
            @RequestBody WorkerRegistrationDTO dto) {
        try {
            System.out.println("Received Step 3 registration request - Worker ID: " + workerId);
            System.out.println("Professional details: services=" + dto.getServices() + ", experience=" + dto.getExperience());
            
            Worker worker = workerService.updateProfessionalDetails(workerId, dto);
            Map<String, Object> response = new HashMap<>();
            response.put("workerId", worker.getId());
            response.put("message", "Professional details saved successfully");
            
            System.out.println("Successfully saved worker professional details. Worker ID: " + worker.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error in registerStep3: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // Step 4: Verification
    @PostMapping("/register/step4")
    public ResponseEntity<?> registerStep4(
            @RequestParam("workerId") Long workerId,
            @RequestParam("aadharNumber") String aadharNumber,
            @RequestParam("policeVerificationStatus") String policeVerificationStatus) {
        try {
            System.out.println("Received Step 4 registration request - Worker ID: " + workerId);
            System.out.println("Verification details: aadharNumber=" + aadharNumber);
            System.out.println("Police verification status: " + policeVerificationStatus);
            
            Worker worker = workerService.updateVerificationDetails(workerId, aadharNumber, policeVerificationStatus);
            Map<String, Object> response = new HashMap<>();
            response.put("workerId", worker.getId());
            response.put("message", "Verification details saved successfully");
            
            System.out.println("Successfully saved worker verification details. Worker ID: " + worker.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error in registerStep4: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // Step 5: Payment Information
    @PostMapping("/register/step5")
    public ResponseEntity<?> registerStep5(
            @RequestParam("workerId") Long workerId,
            @RequestBody WorkerRegistrationDTO dto) {
        try {
            System.out.println("Received Step 5 registration request - Worker ID: " + workerId);
            System.out.println("Payment info: paymentMode=" + dto.getPaymentMode() + ", upiId=" + dto.getUpiId());
            
            Worker worker = workerService.updatePaymentInfo(workerId, dto);
            Map<String, Object> response = new HashMap<>();
            response.put("workerId", worker.getId());
            response.put("message", "Payment information saved successfully");
            response.put("status", worker.getRegistrationStatus());
            
            System.out.println("Successfully saved worker payment info. Worker ID: " + worker.getId() + ", Status: " + worker.getRegistrationStatus());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error in registerStep5: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Final submission
    @PostMapping("/register/submit")
    public ResponseEntity<?> finalizeRegistration(@RequestParam("workerId") Long workerId) {
        try {
            System.out.println("Finalizing registration for worker ID: " + workerId);
            Worker worker = workerService.finalizeRegistration(workerId);
            Map<String, Object> response = new HashMap<>();
            response.put("workerId", worker.getId());
            response.put("message", "Worker registration completed successfully");
            response.put("status", worker.getRegistrationStatus());
            
            System.out.println("Registration finalized successfully. Worker ID: " + worker.getId() + ", Status: " + worker.getRegistrationStatus());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error finalizing registration: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("errorType", e.getClass().getSimpleName());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerWorker(
            @RequestPart("worker") WorkerDTO workerDTO,
            @RequestPart("file") MultipartFile file) {
        try {
            String imageUrl = workerService.uploadImage(file); // Call service method to upload image
            workerService.saveWorker(workerDTO, imageUrl);     // Save worker info in the database
            return ResponseEntity.ok("Worker registered successfully!");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }

    // Document upload endpoint for Step 4
    @PostMapping("/upload/document")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("workerId") Long workerId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("fileType") String fileType) {
        try {
            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || (!contentType.equals("image/png") && 
                !contentType.equals("image/jpg") && 
                !contentType.equals("image/jpeg") && 
                !contentType.equals("application/pdf"))) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Unsupported file type. Only PNG, JPG, and PDF files are allowed.");
                return ResponseEntity.badRequest().body(errorResponse);
            }
            
            // Upload to Cloudinary
            String imageUrl = workerService.uploadImage(file);
            
            // Update worker with the document URL based on fileType
            workerService.updateWorkerDocument(workerId, fileType, imageUrl);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Document uploaded successfully");
            response.put("fileType", fileType);
            response.put("url", imageUrl);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error uploading document: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to upload document: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Get worker details for review page
    @GetMapping("/details/{workerId}")
    public ResponseEntity<?> getWorkerDetails(@PathVariable Long workerId) {
        try {
            Optional<Worker> workerOpt = workerService.getWorkerById(workerId);
            if (!workerOpt.isPresent()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Worker not found");
                return ResponseEntity.notFound().build();
            }
            
            Worker worker = workerOpt.get();
            
            // Create comprehensive response with all worker details
            Map<String, Object> workerDetails = new HashMap<>();
            // Step 1: Basic Information
            workerDetails.put("workerId", worker.getId());
            workerDetails.put("fullName", worker.getFullName());
            workerDetails.put("phone", worker.getPhone());
            workerDetails.put("email", worker.getEmail());
            workerDetails.put("gender", worker.getGender());
            workerDetails.put("dob", worker.getDob());
            workerDetails.put("profileImageUrl", worker.getProfileImageUrl());
            
            // Step 2: Contact Information
            workerDetails.put("permanentAddress", worker.getPermanentAddress());
            workerDetails.put("currentAddress", worker.getCurrentAddress());
            workerDetails.put("city", worker.getCity());
            workerDetails.put("pincode", worker.getPincode());
            workerDetails.put("serviceAreas", worker.getServiceAreas());
            workerDetails.put("openToTravel", worker.getOpenToTravel());
            
            // Step 3: Professional Details
            workerDetails.put("services", worker.getServices());
            workerDetails.put("experience", worker.getExperience());
            workerDetails.put("workType", worker.getWorkType());
            workerDetails.put("availability", worker.getAvailability());
            workerDetails.put("languages", worker.getLanguages());
            
            // Step 4: Verification
            workerDetails.put("aadharNumber", worker.getAadharNumber());
            workerDetails.put("policeVerificationStatus", worker.getPoliceVerificationStatus());
            workerDetails.put("idProofUrl", worker.getIdProofUrl());
            workerDetails.put("selfieWithIdUrl", worker.getSelfieWithIdUrl());
            workerDetails.put("certificateUrls", worker.getCertificateUrls());
            
            // Step 5: Payment Information
            workerDetails.put("paymentMode", worker.getPaymentMode());
            workerDetails.put("upiId", worker.getUpiId());
            workerDetails.put("bankName", worker.getBankName());
            workerDetails.put("accountNumber", worker.getAccountNumber());
            workerDetails.put("ifscCode", worker.getIfscCode());
            workerDetails.put("panCard", worker.getPanCard());
            workerDetails.put("emergencyContactName", worker.getEmergencyContactName());
            workerDetails.put("emergencyContactNumber", worker.getEmergencyContactNumber());
            
            // Registration metadata
            workerDetails.put("registrationStatus", worker.getRegistrationStatus());
            workerDetails.put("registrationDate", worker.getRegistrationDate());
            
            return ResponseEntity.ok(workerDetails);
        } catch (Exception e) {
            System.err.println("Error fetching worker details: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch worker details: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Test endpoint to verify image URL storage
    @GetMapping("/worker/{workerId}/images")
    public ResponseEntity<?> getWorkerImages(@PathVariable Long workerId) {
        try {
            Optional<Worker> workerOpt = workerService.getWorkerById(workerId);
            if (!workerOpt.isPresent()) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Worker not found");
                return ResponseEntity.notFound().build();
            }
            
            Worker worker = workerOpt.get();
            
            Map<String, Object> imageUrls = new HashMap<>();
            imageUrls.put("workerId", worker.getId());
            imageUrls.put("profileImageUrl", worker.getProfileImageUrl());
            imageUrls.put("idProofUrl", worker.getIdProofUrl());
            imageUrls.put("selfieWithIdUrl", worker.getSelfieWithIdUrl());
            imageUrls.put("certificateUrls", worker.getCertificateUrls());
            
            System.out.println("Image URLs verification for worker " + workerId + ": " + imageUrls);
            
            return ResponseEntity.ok(imageUrls);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error retrieving worker images: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Test fresh Cloudinary upload
    @GetMapping("/test/cloudinary")
    public ResponseEntity<?> testCloudinary() {
        try {
            Map<String, Object> testResult = workerService.testCloudinaryConnection();
            return ResponseEntity.ok(testResult);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Cloudinary test failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Test fresh image upload to Cloudinary
    @PostMapping("/test/upload")
    public ResponseEntity<?> testImageUpload(@RequestParam("file") MultipartFile file) {
        try {
            System.out.println("=== TESTING FRESH IMAGE UPLOAD ===");
            System.out.println("File name: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize() + " bytes");
            System.out.println("Content type: " + file.getContentType());
            
            String uploadedUrl = workerService.uploadImage(file);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", uploadedUrl != null);
            response.put("uploadedUrl", uploadedUrl);
            response.put("urlLength", uploadedUrl != null ? uploadedUrl.length() : 0);
            response.put("isCloudinaryUrl", uploadedUrl != null && uploadedUrl.contains("cloudinary.com"));
            response.put("timestamp", System.currentTimeMillis());
            
            System.out.println("=== UPLOAD TEST COMPLETE ===");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Upload test failed: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Upload test failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Debug endpoint to check database content directly
    @GetMapping("/debug/workers")
    public ResponseEntity<?> debugWorkers() {
        try {
            java.util.List<Worker> allWorkers = workerService.getAllWorkers();
            java.util.List<Map<String, Object>> workerDebugInfo = new java.util.ArrayList<>();
            
            for (Worker worker : allWorkers) {
                Map<String, Object> info = new HashMap<>();
                info.put("id", worker.getId());
                info.put("phone", worker.getPhone());
                info.put("profileImageUrl", worker.getProfileImageUrl());
                info.put("profileImageUrlLength", worker.getProfileImageUrl() != null ? worker.getProfileImageUrl().length() : 0);
                info.put("idProofUrl", worker.getIdProofUrl());
                info.put("idProofUrlLength", worker.getIdProofUrl() != null ? worker.getIdProofUrl().length() : 0);
                info.put("selfieWithIdUrl", worker.getSelfieWithIdUrl());
                info.put("selfieWithIdUrlLength", worker.getSelfieWithIdUrl() != null ? worker.getSelfieWithIdUrl().length() : 0);
                info.put("certificateUrls", worker.getCertificateUrls());
                info.put("registrationStatus", worker.getRegistrationStatus());
                workerDebugInfo.add(info);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("totalWorkers", allWorkers.size());
            response.put("workers", workerDebugInfo);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Debug query failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}



