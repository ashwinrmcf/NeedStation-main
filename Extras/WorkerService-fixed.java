package com.example.authbackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.authbackend.config.TwilioConfig;
import com.example.authbackend.dto.WorkerDTO;
import com.example.authbackend.dto.WorkerRegistrationDTO;
import com.example.authbackend.model.Worker;
import com.example.authbackend.repository.WorkerRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class WorkerService {

    /**
     * Authenticate a worker by email and phone.
     * @param email The worker's email
     * @param phone The worker's phone
     * @return Optional<Worker> if credentials match, empty otherwise
     */
    public Optional<Worker> authenticateWorker(String email, String phone) {
        if (email == null || phone == null) return Optional.empty();
        return repo.findByEmailIgnoreCaseAndPhone(email.trim(), phone.trim());
    }

    private final WorkerRepository repo;
    private final Cloudinary cloudinary;
    private final ObjectMapper objectMapper;
    private final TwilioConfig twilioConfig;
    private final FreeOtpService freeOtpService;
    private final TwoFactorOtpService twoFactorOtpService;
    
    @Value("${use-free-otp:false}")
    private boolean useFreeOtp;
    
    @Value("${sms.default-provider:2factor}")
    private String smsProvider;

    public WorkerService(WorkerRepository repo, Cloudinary cloudinary, ObjectMapper objectMapper, 
                       TwilioConfig twilioConfig, FreeOtpService freeOtpService, 
                       TwoFactorOtpService twoFactorOtpService) {
        this.repo = repo;
        this.cloudinary = cloudinary;
        this.objectMapper = objectMapper;
        this.twilioConfig = twilioConfig;
        this.freeOtpService = freeOtpService;
        this.twoFactorOtpService = twoFactorOtpService;
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
            Map<String, Object> faceCropTransform = new HashMap<>();
            faceCropTransform.put("width", 500);
            faceCropTransform.put("height", 500);
            faceCropTransform.put("crop", "fill");
            faceCropTransform.put("gravity", "face");  // Auto-detect faces
            
            // Second transformation: Apply minimal quality improvements
            Map<String, Object> qualityTransform = new HashMap<>();
            qualityTransform.put("quality", "auto");   // Auto optimize quality
            qualityTransform.put("fetch_format", "auto"); // Auto format detection
            
            // Add transformations to options
            transformations.add(faceCropTransform);
            transformations.add(qualityTransform);
            options.put("transformation", transformations);
            
            // Upload the image to Cloudinary with the specified options
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), options);
            
            // Get the secure URL from the upload result
            String imageUrl = (String) uploadResult.get("secure_url");
            System.out.println("Image uploaded successfully to: " + imageUrl);
            
            return imageUrl;
        } catch (Exception e) {
            System.err.println("Error uploading image to Cloudinary: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // Upload multiple files and return a map of file names to URLs
    public Map<String, String> uploadMultipleFiles(Map<String, MultipartFile> files) throws IOException {
        Map<String, String> uploadedUrls = new HashMap<>();
        
        if (files != null && !files.isEmpty()) {
            for (Map.Entry<String, MultipartFile> entry : files.entrySet()) {
                if (entry.getValue() != null && !entry.getValue().isEmpty()) {
                    String url = uploadImage(entry.getValue());
                    uploadedUrls.put(entry.getKey(), url);
                }
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
        
        // Initialize OTP fields
        worker.setOtpAttempts(0);
        worker.setPhoneVerified(false);
        
        return repo.save(worker);  // Return the saved worker
    }
    
    // Set this to false to use actual Twilio services
    private static final boolean TRIAL_MODE = false;
    // Fixed test OTP for trial mode - in production, this would come from Twilio
    private static final String TEST_OTP = "123456";
    
    /**
     * Sends an OTP verification to the worker's phone number using Twilio Verify API
     * @param worker The worker to send the OTP to
     * @return true if OTP was sent successfully, false otherwise
     */
    public boolean generateAndSendOtp(Worker worker) {
        String phoneNumber = worker.getPhone();
        
        try {
            // Format phone number if needed
            // E.164 format: +[country code][phone number without leading 0]
            if (!phoneNumber.startsWith("+")) {
                // Assuming India (+91) as default country code
                phoneNumber = "+91" + phoneNumber;
                System.out.println("Formatted phone number to: " + phoneNumber);
            }
            
            // Check if 2Factor API is the default provider
            if ("2factor".equalsIgnoreCase(smsProvider)) {
                System.out.println("Using 2Factor API for phone: " + phoneNumber);
                boolean result = twoFactorOtpService.generateOtp(worker);
                if (result) {
                    // Save the worker
                    worker.setOtpCreatedAt(LocalDateTime.now());
                    worker.setOtpExpiresAt(LocalDateTime.now().plusMinutes(10));
                    worker.setOtpAttempts(0);
                    repo.save(worker);
                    System.out.println("2Factor API: OTP sent successfully to " + phoneNumber);
                    return true;
                } else {
                    System.out.println("2Factor API failed, trying fallback methods");
                }
            }
            // Use Free OTP API if enabled
            else if (useFreeOtp) {
                System.out.println("Using Free OTP API for phone: " + phoneNumber);
                boolean result = freeOtpService.generateOtp(worker);
                if (result) {
                    // Save the worker
                    repo.save(worker);
                    return true;
                } else {
                    // Fall back to trial mode if free OTP API fails
                    System.out.println("Free OTP API failed, falling back to trial mode");
                    worker.setPhoneVerificationOtp(TEST_OTP);
                    
                    LocalDateTime now = LocalDateTime.now();
                    worker.setOtpCreatedAt(now);
                    worker.setOtpExpiresAt(now.plusMinutes(10));
                    worker.setOtpAttempts(0);
                    repo.save(worker);
                    
                    System.out.println("Fallback mode: OTP " + TEST_OTP + " set for " + phoneNumber);
                    return true;
                }
            } else if (TRIAL_MODE) {
                // In trial mode, we don't actually send an SMS
                // Instead, we generate a fixed OTP and save it
                worker.setPhoneVerificationOtp(TEST_OTP);
                
                // Set OTP expiration time (10 minutes from now)
                LocalDateTime now = LocalDateTime.now();
                worker.setOtpCreatedAt(now);
                worker.setOtpExpiresAt(now.plusMinutes(10));
                
                // Reset OTP attempts
                worker.setOtpAttempts(0);
                
                // Save the worker with the new OTP
                repo.save(worker);
                
                System.out.println("Trial mode: OTP " + TEST_OTP + " set for " + phoneNumber);
                return true;
            } else {
                // In production mode, use Twilio to send an OTP
                System.out.println("Attempting to send OTP via Twilio to: " + phoneNumber);
                System.out.println("Using Verify Service SID: " + twilioConfig.getVerifyServiceSid());
                
                try {
                    Verification verification = Verification.creator(
                        twilioConfig.getVerifyServiceSid(),  // Verify Service SID
                        phoneNumber,                         // To (phone number)
                        "sms")                               // Channel type
                        .create();
                    
                    // Successfully sent OTP
                    System.out.println("Sent OTP to " + phoneNumber + " with status: " + verification.getStatus());
                    
                    // Set OTP expiration time (10 minutes from now)
                    LocalDateTime now = LocalDateTime.now();
                    worker.setOtpCreatedAt(now);
                    worker.setOtpExpiresAt(now.plusMinutes(10));
                    
                    // Reset OTP attempts
                    worker.setOtpAttempts(0);
                    
                    // Save the worker
                    repo.save(worker);
                    
                    return true;
                } catch (Exception e) {
                    System.err.println("Twilio API Error: " + e.getMessage());
                    e.printStackTrace();
                    
                    // Try using Free OTP API as fallback if enabled
                    if (useFreeOtp) {
                        System.out.println("Falling back to Free OTP API due to Twilio error");
                        boolean result = freeOtpService.generateOtp(worker);
                        if (result) {
                            // Save the worker
                            repo.save(worker);
                            return true;
                        }
                    }
                    
                    // Try using trial mode as last resort fallback
                    System.out.println("Falling back to trial mode due to errors");
                    worker.setPhoneVerificationOtp(TEST_OTP);
                    
                    LocalDateTime now = LocalDateTime.now();
                    worker.setOtpCreatedAt(now);
                    worker.setOtpExpiresAt(now.plusMinutes(10));
                    worker.setOtpAttempts(0);
                    repo.save(worker);
                    
                    System.out.println("Fallback mode: OTP " + TEST_OTP + " set for " + phoneNumber);
                    return true;
                }
            }
        } catch (Exception e) {
            System.err.println("Error sending OTP: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
        
        return false; // Default return if no method succeeds
    }
    
    /**
     * Verifies an OTP for a worker using Twilio Verify API
     * @param workerId The worker ID
     * @param otp The OTP to verify
     * @return true if verification successful, false otherwise
     */
    public boolean verifyOtp(Long workerId, String otp) {
        Optional<Worker> workerOpt = repo.findById(workerId);
        if (workerOpt.isEmpty()) {
            return false;
        }
        
        Worker worker = workerOpt.get();
        
        // Check if worker already verified
        Boolean verified = worker.getPhoneVerified();
        if (verified != null && verified) {
            return true;
        }
        
        // Check if max attempts reached (5 attempts)
        if (worker.getOtpAttempts() >= 5) {
            return false;
        }
        
        try {
            // Check if 2Factor API is the default provider
            if ("2factor".equalsIgnoreCase(smsProvider)) {
                System.out.println("Using 2Factor API for verification");
                // Check if OTP is expired
                if (worker.getOtpExpiresAt() != null && LocalDateTime.now().isAfter(worker.getOtpExpiresAt())) {
                    System.out.println("OTP expired");
                    worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                    repo.save(worker);
                    return false;
                }
                
                boolean verified_otp = twoFactorOtpService.verifyOtp(worker, otp);
                if (verified_otp) {
                    worker.setPhoneVerified(true);
                    worker.setOtpAttempts(0);
                    repo.save(worker);
                    System.out.println("2Factor API: OTP verified successfully");
                    return true;
                } else {
                    // Increment failed attempts
                    worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                    repo.save(worker);
                    System.out.println("2Factor API: Invalid OTP - Please check if you entered the correct code");
                    return false;
                }
            }
            // Use Free OTP API if enabled
            else if (useFreeOtp) {
                System.out.println("Using Free OTP API for verification");
                // Check if OTP is expired
                if (worker.getOtpExpiresAt() != null && LocalDateTime.now().isAfter(worker.getOtpExpiresAt())) {
                    System.out.println("OTP expired");
                    worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                    repo.save(worker);
                    return false;
                }
                
                boolean verified_otp = freeOtpService.verifyOtp(worker, otp);
                if (verified_otp) {
                    worker.setPhoneVerified(true);
                    worker.setOtpAttempts(0);
                    repo.save(worker);
                    System.out.println("Free OTP API: OTP verified successfully");
                    return true;
                } else {
                    // Increment failed attempts
                    worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                    repo.save(worker);
                    System.out.println("Free OTP API: Invalid OTP");
                    return false;
                }
            } else if (TRIAL_MODE) {
                // In trial mode, we check against the stored test OTP
                // Check if OTP is expired in trial mode
                if (worker.getOtpExpiresAt() != null && LocalDateTime.now().isAfter(worker.getOtpExpiresAt())) {
                    System.out.println("OTP expired in trial mode");
                    worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                    repo.save(worker);
                    return false;
                }
                
                // Check if the OTP matches the test OTP
                if (TEST_OTP.equals(otp) || (worker.getPhoneVerificationOtp() != null && worker.getPhoneVerificationOtp().equals(otp))) {
                    // OTP is correct
                    worker.setPhoneVerified(true); // Explicitly set to true
                    worker.setOtpAttempts(0);      // Reset attempts counter
                    repo.save(worker);
                    System.out.println("Trial mode: OTP verified successfully");
                    return true;
                } else {
                    // Increment failed attempts
                    worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                    repo.save(worker);
                    System.out.println("Trial mode: Invalid OTP");
                    return false;
                }
            } else {
                // Production mode - use actual Twilio Verify API
                String phoneNumber = formatPhoneNumber(worker.getPhone());
                
                try {
                    // Verify the code with Twilio Verify API
                    VerificationCheck verificationCheck = VerificationCheck.creator(
                            twilioConfig.getVerifyServiceSid())  // Verify Service SID
                            .setTo(phoneNumber)                  // Phone number
                            .setCode(otp)                        // Code entered by user
                            .create();
                    
                    System.out.println("Verification check SID: " + verificationCheck.getSid());
                    System.out.println("Status: " + verificationCheck.getStatus());
                    
                    if ("approved".equals(verificationCheck.getStatus())) {
                        // OTP is correct
                        worker.setPhoneVerified(true);
                        repo.save(worker);
                        return true;
                    } else {
                        // Increment failed attempts
                        worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                        repo.save(worker);
                        return false;
                    }
                } catch (Exception e) {
                    System.err.println("Twilio verification error: " + e.getMessage());
                    // Increment failed attempts
                    worker.setOtpAttempts(worker.getOtpAttempts() + 1);
                    repo.save(worker);
                    return false;
                }
            }
        } catch (Exception e) {
            System.err.println("Error during OTP verification: " + e.getMessage());
            e.printStackTrace();
            worker.setOtpAttempts(worker.getOtpAttempts() + 1);
            repo.save(worker);
            return false;
        }
    }
    
    /**
     * Formats a phone number to the E.164 international format
     * @param phoneNumber The phone number to format
     * @return The formatted phone number
     */
    private String formatPhoneNumber(String phoneNumber) {
        if (phoneNumber == null) {
            return null;
        }
        
        // Clean the phone number, removing spaces, dashes, etc.
        String cleaned = phoneNumber.replaceAll("[\\s\\-()]", "");
        
        // If it doesn't start with +, assume it's an Indian number and add +91
        if (!cleaned.startsWith("+")) {
            // If it starts with a 0, remove it (common for local format)
            if (cleaned.startsWith("0")) {
                cleaned = cleaned.substring(1);
            }
            
            // Add country code
            cleaned = "+91" + cleaned;
        }
        
        return cleaned;
    }
    
    // Get worker by ID
    public Optional<Worker> getWorkerById(Long id) {
        return repo.findById(id);
    }

    // Find worker by phone number
    public Optional<Worker> findWorkerByPhone(String phone) {
        try {
            if (phone == null || phone.trim().isEmpty()) {
                System.out.println("Attempt to find worker with null/empty phone number");
                return Optional.empty();
            }
            
            // Format the phone number if needed
            String formattedPhone = phone.trim();
            
            // Try to find the worker
            Optional<Worker> worker = repo.findByPhone(formattedPhone);
            if (worker.isPresent()) {
                return worker;
            }
            
            // If not found, try without formatting
            return repo.findByPhone(phone);
        } catch (Exception e) {
            System.err.println("Error finding worker by phone: " + e.getMessage());
            return Optional.empty();
        }
    }
    
    // Step 1: Update basic information
    public Worker updateBasicInfo(Long workerId, WorkerRegistrationDTO dto, MultipartFile profilePicture) throws IOException {
        Worker worker = getOrCreateWorker(workerId);
        
        // Update fields
        if (dto.getFullName() != null) {
            worker.setFullName(dto.getFullName());
        }
        
        if (dto.getGender() != null) {
            worker.setGender(dto.getGender());
        }
        
        if (dto.getDob() != null) {
            worker.setDob(LocalDate.parse(dto.getDob()));
        }
        
        if (dto.getPhone() != null) {
            worker.setPhone(dto.getPhone());
        }
        
        if (dto.getEmail() != null) {
            worker.setEmail(dto.getEmail());
        }
        
        if (dto.getWhatsappNumber() != null) {
            worker.setWhatsappNumber(dto.getWhatsappNumber());
        }
        
        // Handle profile picture upload
        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                String imageUrl = uploadImage(profilePicture);
                worker.setProfileImageUrl(imageUrl);
            } catch (Exception e) {
                System.err.println("Failed to upload profile picture: " + e.getMessage());
                // Continue without updating the profile picture
            }
        }
        
        // Update status
        worker.setRegistrationStatus("STEP_1_COMPLETED");
        
        // Save worker
        worker = repo.save(worker);
        
        // Attempt to send OTP
        if (!worker.getPhoneVerified()) {
            generateAndSendOtp(worker);
        }
        
        return worker;
    }
    
    // Step 2: Update contact information
    public Worker updateContactInfo(Long workerId, WorkerRegistrationDTO dto) {
        Worker worker = getWorkerOrThrow(workerId);
        
        worker.setAddress(dto.getAddress());
        worker.setCity(dto.getCity());
        worker.setState(dto.getState());
        worker.setPincode(dto.getPincode());
        worker.setLocality(dto.getLocality());
        worker.setRegistrationStatus("STEP_2_COMPLETED");
        
        return repo.save(worker);
    }
    
    // Step 3: Update professional details
    public Worker updateProfessionalDetails(Long workerId, WorkerRegistrationDTO dto) {
        Worker worker = getWorkerOrThrow(workerId);
        
        worker.setWorkExperience(dto.getWorkExperience());
        worker.setEducation(dto.getEducation());
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
