package com.example.authbackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.authbackend.dto.WorkerDTO;
import com.example.authbackend.dto.WorkerRegistrationDTO;
import com.example.authbackend.model.Worker;
import com.example.authbackend.repository.WorkerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class WorkerService {

    private final WorkerRepository repo;
    private final Cloudinary cloudinary;
    private final ObjectMapper objectMapper;

    public WorkerService(WorkerRepository repo, Cloudinary cloudinary, ObjectMapper objectMapper) {
        this.repo = repo;
        this.cloudinary = cloudinary;
        this.objectMapper = objectMapper;
    }

    // Method to upload image to Cloudinary and return the image URL
    public String uploadImage(MultipartFile file) throws IOException {
        try {
            if (file == null || file.isEmpty()) {
                System.out.println("Upload image called with null or empty file");
                return null;
            }
            
            System.out.println("Uploading image to Cloudinary. File size: " + file.getSize() + ", Content Type: " + file.getContentType());
            
            // Create optimized upload options for profile pictures based on Cloudinary documentation
            Map<String, Object> options = new HashMap<>();
            
            // Basic upload settings
            options.put("resource_type", "auto");
            options.put("folder", "worker_profiles");
            options.put("unique_filename", true);
            options.put("overwrite", false);
            options.put("use_filename", true);
            
            // For displaying in Media Library with better organization
            String displayName = "Worker Profile - " + (System.currentTimeMillis() / 1000);
            options.put("display_name", displayName);
            
            // Add structured metadata to help with organization and search
            Map<String, Object> context = new HashMap<>();
            context.put("alt", "Worker Profile Picture");
            context.put("caption", "Need Station Worker Profile");
            context.put("category", "profile_images");
            options.put("context", context);
            
            // Enable quality analysis to ensure high-quality profile pictures
            options.put("quality_analysis", true);
            
            // Create transformation array for advanced options
            List<Map<String, Object>> transformations = new ArrayList<>();
            
            // First transformation: Crop to square with face detection
            Map<String, Object> cropTransformation = new HashMap<>();
            cropTransformation.put("width", 400);
            cropTransformation.put("height", 400);
            cropTransformation.put("crop", "fill");
            cropTransformation.put("gravity", "face"); // Face detection for better cropping
            transformations.add(cropTransformation);
            
            // Second transformation: Quality and format optimization
            Map<String, Object> qualityTransformation = new HashMap<>();
            qualityTransformation.put("quality", "auto:good"); // Auto quality with good balance
            qualityTransformation.put("fetch_format", "auto");  // Auto select best format
            qualityTransformation.put("flags", "progressive");  // Progressive loading
            transformations.add(qualityTransformation);
            
            // Add transformations to options
            options.put("transformation", transformations);
            
            // Convert file to byte array
            byte[] fileData = file.getBytes();
            if (fileData.length == 0) {
                System.err.println("File data is empty despite having size: " + file.getSize());
                return null;
            }
            
            // Upload to Cloudinary
            System.out.println("Starting Cloudinary upload with options: " + options);
            Map uploadResult = cloudinary.uploader().upload(fileData, options);
            
            // Print entire result for debugging
            System.out.println("Cloudinary upload response: " + uploadResult.toString());
            
            if (uploadResult.containsKey("secure_url")) {
                String secureUrl = uploadResult.get("secure_url").toString();
                System.out.println("Image uploaded successfully. Secure URL: " + secureUrl);
                return secureUrl;  // Returns the secure URL of the uploaded image
            } else {
                System.err.println("No secure_url found in Cloudinary response");
                return null;
            }
        } catch (Exception e) {
            // Log the error but don't throw it
            System.err.println("Error uploading to Cloudinary: " + e.getMessage());
            e.printStackTrace();
            return null; // Return null instead of throwing exception
        }
    }
    
    // Upload multiple files and return a map of file names to URLs
    public Map<String, String> uploadMultipleFiles(Map<String, MultipartFile> files) throws IOException {
        Map<String, String> uploadedUrls = new HashMap<>();
        
        for (Map.Entry<String, MultipartFile> entry : files.entrySet()) {
            String key = entry.getKey();
            MultipartFile file = entry.getValue();
            
            if (file != null && !file.isEmpty()) {
                String url = uploadImage(file);
                uploadedUrls.put(key, url);
            }
        }
        
        return uploadedUrls;
    }

    // Method to save Worker details in the database (Step 1)
    public Worker saveWorker(WorkerDTO dto, String imageUrl) {
        Worker worker = new Worker();
        worker.setFullName(dto.getFullName());
        worker.setGender(dto.getGender());
        worker.setDob(LocalDate.parse(dto.getDob())); // Parses the DOB string into LocalDate
        worker.setPhone(dto.getPhone());
        worker.setEmail(dto.getEmail());
        worker.setWhatsappNumber(dto.getWhatsappNumber());
        worker.setProfileImageUrl(imageUrl); // Saves the profile image URL
        worker.setRegistrationDate(LocalDate.now());
        worker.setRegistrationStatus("INCOMPLETE");
        return repo.save(worker);  // Saves the Worker entity to the database
    }
    
    // Get worker by ID
    public Optional<Worker> getWorkerById(Long id) {
        return repo.findById(id);
    }
    
    // Multi-step registration methods
    
    // Step 1: Update basic information
    public Worker updateBasicInfo(Long workerId, WorkerRegistrationDTO dto, MultipartFile profilePicture) throws IOException {
        System.out.println("Updating basic info: " + dto.toString());
        
        try {
            // Log the DTO data received from frontend
            System.out.println("===== Worker DTO Data Received =====");
            System.out.println("FullName: " + dto.getFullName());
            System.out.println("Gender: " + dto.getGender());
            System.out.println("DOB: " + dto.getDob());
            System.out.println("Phone: " + dto.getPhone());
            System.out.println("Email: " + dto.getEmail());
            System.out.println("WhatsApp: " + dto.getWhatsappNumber());
            System.out.println("====================================");
            
            // Backend validation for required fields
            if (dto.getFullName() == null || dto.getFullName().trim().isEmpty()) {
                throw new IllegalArgumentException("Full name is required");
            }
            if (dto.getGender() == null || dto.getGender().trim().isEmpty()) {
                throw new IllegalArgumentException("Gender is required");
            }
            if (dto.getDob() == null || dto.getDob().trim().isEmpty()) {
                throw new IllegalArgumentException("Date of birth is required");
            }
            if (dto.getPhone() == null || dto.getPhone().trim().isEmpty()) {
                throw new IllegalArgumentException("Phone number is required");
            }
            
            // Get or create worker
            Worker worker = getOrCreateWorker(workerId);
            
            // Update basic info fields with trimmed values to remove whitespace
            worker.setFullName(dto.getFullName().trim());
            worker.setGender(dto.getGender().trim());
            worker.setDob(LocalDate.parse(dto.getDob().trim()));
            worker.setPhone(dto.getPhone().trim());
            worker.setEmail(dto.getEmail() != null ? dto.getEmail().trim() : "");
            worker.setWhatsappNumber(dto.getWhatsappNumber() != null ? dto.getWhatsappNumber().trim() : "");
            
            // Upload profile picture if provided, but handle errors gracefully
            if (profilePicture != null && !profilePicture.isEmpty()) {
                try {
                    System.out.println("Processing profile picture upload. File size: " + profilePicture.getSize() + " bytes, Content type: " + profilePicture.getContentType());
                    String imageUrl = uploadImage(profilePicture);
                    
                    // Detailed logging for debugging
                    if (imageUrl != null) {
                        System.out.println("Successfully uploaded image to Cloudinary. URL: " + imageUrl);
                        worker.setProfileImageUrl(imageUrl);
                        System.out.println("Set profileImageUrl on worker entity. About to save.");
                    } else {
                        System.err.println("Image upload returned null URL - possible Cloudinary issue");
                    }
                } catch (Exception e) {
                    // Log the error but continue with registration
                    System.err.println("Error processing profile picture: " + e.getMessage());
                    e.printStackTrace();
                    // We'll still save the worker without the profile picture
                }
            } else {
                System.out.println("No profile picture provided or file is empty");
            }
            
            System.out.println("Saving worker to database. Worker ID: " + worker.getId() + ", Profile image URL: " + worker.getProfileImageUrl());
            Worker savedWorker = repo.save(worker);
            System.out.println("Worker saved successfully. Worker ID: " + savedWorker.getId() + ", Profile image URL: " + savedWorker.getProfileImageUrl());
            return savedWorker;
        } catch (Exception e) {
            // Log the complete error for debugging
            System.err.println("Error in updateBasicInfo: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to save worker information: " + e.getMessage(), e);
        }
    }
    
    // Step 2: Update contact information
    public Worker updateContactInfo(Long workerId, WorkerRegistrationDTO dto) {
        Worker worker = getWorkerOrThrow(workerId);
        
        worker.setPermanentAddress(dto.getPermanentAddress());
        worker.setCurrentAddress(dto.getCurrentAddress());
        worker.setCity(dto.getCity());
        worker.setPincode(dto.getPincode());
        worker.setServiceAreas(dto.getServiceAreas());
        worker.setOpenToTravel(dto.getOpenToTravel());
        
        return repo.save(worker);
    }
    
    // Step 3: Update professional details
    public Worker updateProfessionalDetails(Long workerId, WorkerRegistrationDTO dto) {
        Worker worker = getWorkerOrThrow(workerId);
        
        worker.setServices(dto.getServices());
        worker.setExperience(dto.getExperience());
        worker.setWorkType(dto.getWorkType());
        worker.setAvailability(dto.getAvailability());
        worker.setLanguages(dto.getLanguages());
        
        return repo.save(worker);
    }
    
    // Step 4: Update verification details
    public Worker updateVerificationDetails(Long workerId, WorkerRegistrationDTO dto, 
                                          MultipartFile idProof, MultipartFile selfieWithId,
                                          MultipartFile[] certificates) throws IOException {
        Worker worker = getWorkerOrThrow(workerId);
        
        worker.setAadharNumber(dto.getAadharNumber());
        worker.setPoliceVerificationStatus(dto.getPoliceVerificationStatus());
        
        // Upload ID proof if provided
        if (idProof != null && !idProof.isEmpty()) {
            String idProofUrl = uploadImage(idProof);
            worker.setIdProofUrl(idProofUrl);
        }
        
        // Upload selfie with ID if provided
        if (selfieWithId != null && !selfieWithId.isEmpty()) {
            String selfieUrl = uploadImage(selfieWithId);
            worker.setSelfieWithIdUrl(selfieUrl);
        }
        
        // Upload certificates if provided
        if (certificates != null && certificates.length > 0) {
            Map<String, String> certificateUrls = new HashMap<>();
            for (int i = 0; i < certificates.length; i++) {
                if (certificates[i] != null && !certificates[i].isEmpty()) {
                    String certUrl = uploadImage(certificates[i]);
                    certificateUrls.put("certificate_" + (i+1), certUrl);
                }
            }
            worker.setCertificateUrls(objectMapper.writeValueAsString(certificateUrls));
        }
        
        return repo.save(worker);
    }
    
    // Step 5: Update payment information
    public Worker updatePaymentInfo(Long workerId, WorkerRegistrationDTO dto) {
        Worker worker = getWorkerOrThrow(workerId);
        
        worker.setPaymentMode(dto.getPaymentMode());
        worker.setUpiId(dto.getUpiId());
        worker.setBankName(dto.getBankName());
        worker.setAccountNumber(dto.getAccountNumber());
        worker.setIfscCode(dto.getIfscCode());
        worker.setPanCard(dto.getPanCard());
        worker.setEmergencyContactName(dto.getEmergencyContactName());
        worker.setEmergencyContactNumber(dto.getEmergencyContactNumber());
        
        // Update status to pending verification
        worker.setRegistrationStatus("PENDING_VERIFICATION");
        
        return repo.save(worker);
    }
    
    // Finalize worker registration
    public Worker finalizeRegistration(Long workerId) {
        Worker worker = getWorkerOrThrow(workerId);
        worker.setRegistrationStatus("VERIFIED"); // Or any other final status
        return repo.save(worker);
    }
    
    // Helper methods
    private Worker getOrCreateWorker(Long workerId) {
        Worker worker;
        if (workerId != null) {
            worker = repo.findById(workerId).orElse(null);
            if (worker != null) {
                return worker;
            }
        }
        
        // Create a new worker with default values
        worker = new Worker();
        worker.setRegistrationDate(LocalDate.now());
        worker.setRegistrationStatus("INCOMPLETE");
        
        // Explicitly set all not-null fields to prevent database constraint violations
        worker.setOpenToTravel(false);
        worker.setFullName("");
        worker.setGender("");
        worker.setPhone("");
        worker.setDob(LocalDate.now());
        
        // Log that we're creating a new worker
        System.out.println("Creating new worker record");
        
        return worker;
    }
    
    private Worker getWorkerOrThrow(Long workerId) {
        if (workerId == null) {
            throw new IllegalArgumentException("Worker ID cannot be null");
        }
        return repo.findById(workerId)
            .orElseThrow(() -> new RuntimeException("Worker not found with ID: " + workerId));
    }
}



