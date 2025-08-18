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
import lombok.RequiredArgsConstructor;
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

    // Test Cloudinary connection with fresh upload
    public Map<String, Object> testCloudinaryConnection() {
        Map<String, Object> result = new HashMap<>();
        try {
            System.out.println("=== TESTING FRESH CLOUDINARY UPLOAD ===");
            
            // Check if cloudinary instance is null
            if (cloudinary == null) {
                System.err.println("ERROR: Cloudinary instance is null");
                result.put("success", false);
                result.put("error", "Cloudinary instance is null");
                return result;
            }
            
            // Test with timestamped upload to verify fresh uploads
            String timestamp = String.valueOf(System.currentTimeMillis());
            String testData = "Fresh test upload at " + timestamp;
            Map<String, Object> options = ObjectUtils.asMap(
                "resource_type", "raw",
                "public_id", "fresh_test_" + timestamp,
                "folder", "test_uploads"
            );
            
            System.out.println("Attempting fresh test upload with timestamp: " + timestamp);
            Map uploadResult = cloudinary.uploader().upload(testData.getBytes(), options);
            
            System.out.println("Fresh upload result: " + uploadResult);
            
            if (uploadResult != null && uploadResult.containsKey("public_id")) {
                String publicId = uploadResult.get("public_id").toString();
                String secureUrl = uploadResult.containsKey("secure_url") ? 
                    uploadResult.get("secure_url").toString() : "No secure_url";
                
                System.out.println("Fresh upload SUCCESSFUL - Public ID: " + publicId);
                System.out.println("Fresh upload URL: " + secureUrl);
                
                result.put("success", true);
                result.put("publicId", publicId);
                result.put("secureUrl", secureUrl);
                result.put("timestamp", timestamp);
                result.put("fullResponse", uploadResult.toString());
                
                return result;
            } else {
                System.err.println("Fresh upload failed - no public_id in response");
                result.put("success", false);
                result.put("error", "No public_id in response");
                result.put("response", uploadResult.toString());
                return result;
            }
        } catch (Exception e) {
            System.err.println("Fresh upload test FAILED: " + e.getMessage());
            e.printStackTrace();
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("stackTrace", e.getStackTrace());
            return result;
        }
    }

    // Method to upload image to Cloudinary and return the image URL
    public String uploadImage(MultipartFile file) throws IOException {
        try {
            if (file == null || file.isEmpty()) {
                System.out.println("Upload image called with null or empty file");
                return null;
            }

            System.out.println("File size: " + file.getSize() + " bytes");
            System.out.println("Content type: " + file.getContentType());

            // Pre-upload connection test
            Map<String, Object> connectionTest = testCloudinaryConnection();
            Boolean isConnected = (Boolean) connectionTest.get("success");
            if (isConnected == null || !isConnected) {
                System.err.println("Cloudinary connection test failed before upload");
                return null;
            }

            // Simplified upload options for debugging
            Map<String, Object> options = new HashMap<>();
            options.put("resource_type", "auto");
            options.put("folder", "worker_profiles");
            
            System.out.println("Using simplified Cloudinary options for debugging: " + options);

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
                
                // Additional validation
                if (secureUrl == null || secureUrl.trim().isEmpty()) {
                    System.err.println("WARNING: Cloudinary returned empty or null secure_url");
                    return null;
                }
                
                // Verify this is actually a Cloudinary URL
                if (!secureUrl.contains("cloudinary.com")) {
                    System.err.println("WARNING: URL doesn't contain cloudinary.com: " + secureUrl);
                }
                
                System.out.println("Returning valid Cloudinary URL: " + secureUrl);
                return secureUrl;  // Returns the secure URL of the uploaded image
            } else {
                System.err.println("No secure_url found in Cloudinary response");
                System.err.println("Available keys in response: " + uploadResult.keySet());
                
                // Check if there's a regular URL instead
                if (uploadResult.containsKey("url")) {
                    String url = uploadResult.get("url").toString();
                    System.out.println("Found regular URL instead of secure_url: " + url);
                    return url;
                }
                
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

        // Initialize OTP fields
        worker.setPhoneVerified(false); // Explicitly set to false
        worker.setOtpAttempts(0);       // Initialize attempts counter

        // Save worker first to get an ID
        worker = repo.save(worker);

        // Generate and send OTP for phone verification
        generateAndSendOtp(worker);

        return worker;  // Return the saved worker
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
    return false;
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

                // No verification method worked
                // (Unreachable duplicate removed)
            }
        } catch (Exception e) {
            System.err.println("Error checking verification: " + e.getMessage());
            e.printStackTrace();

            // Increment failed attempts
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
    if (phoneNumber == null || phoneNumber.isEmpty()) {
        return phoneNumber;
    }

    // Format phone number to E.164 format if not already
    String formattedNumber = phoneNumber;
    if (!phoneNumber.startsWith("+")) {
        // Assuming Indian numbers, adapt as needed for other countries
        formattedNumber = "+91" + phoneNumber.replaceAll("[\\s-]", "");
    }

    return formattedNumber;
}

// Get worker by ID
public Optional<Worker> getWorkerById(Long id) {
    return repo.findById(id);
}

// Get all workers for debugging
public java.util.List<Worker> getAllWorkers() {
    return repo.findAll();
}

// Find worker by phone number
public java.util.Optional<Worker> findWorkerByPhone(String phone) {
    // Format phone number if needed (to handle +91 prefix variations)
    if (phone.startsWith("+91")) {
        phone = phone.substring(3); // Remove +91 prefix
    }

    // Find by raw phone number first
    java.util.Optional<Worker> worker = repo.findByPhone(phone);

    if (!worker.isPresent() && !phone.startsWith("+")) {
        // Try with +91 prefix
        worker = repo.findByPhone("+91" + phone);
    }

    return worker;
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

        // Get or create worker, but check for existing phone number first
        Worker worker = getOrCreateWorker(workerId, dto.getPhone());

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
                    
                    // Validate URL format
                    if (imageUrl.length() > 500) {
                        System.err.println("WARNING: Profile image URL seems too long, might be image data instead of URL: " + imageUrl.substring(0, 100) + "...");
                    }
                    if (!imageUrl.startsWith("http")) {
                        System.err.println("WARNING: Profile image URL doesn't start with http: " + imageUrl);
                    }
                    
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
        System.out.println("Uploading ID proof document...");
        String idProofUrl = uploadImage(idProof);
        System.out.println("ID proof upload result: " + idProofUrl);
        worker.setIdProofUrl(idProofUrl);
        System.out.println("Set ID proof URL on worker entity: " + worker.getIdProofUrl());
    }

    // Upload selfie with ID if provided
    if (selfieWithId != null && !selfieWithId.isEmpty()) {
        System.out.println("Uploading selfie with ID document...");
        String selfieUrl = uploadImage(selfieWithId);
        System.out.println("Selfie with ID upload result: " + selfieUrl);
        worker.setSelfieWithIdUrl(selfieUrl);
        System.out.println("Set selfie with ID URL on worker entity: " + worker.getSelfieWithIdUrl());
    }

    // Upload certificates if provided
    if (certificates != null && certificates.length > 0) {
        System.out.println("Uploading " + certificates.length + " certificate(s)...");
        Map<String, String> certificateUrls = new HashMap<>();
        for (int i = 0; i < certificates.length; i++) {
            if (certificates[i] != null && !certificates[i].isEmpty()) {
                System.out.println("Uploading certificate " + (i+1) + "...");
                String certUrl = uploadImage(certificates[i]);
                System.out.println("Certificate " + (i+1) + " upload result: " + certUrl);
                certificateUrls.put("certificate_" + (i+1), certUrl);
            }
        }
        String certificateUrlsJson = objectMapper.writeValueAsString(certificateUrls);
        worker.setCertificateUrls(certificateUrlsJson);
        System.out.println("Set certificate URLs JSON on worker entity: " + certificateUrlsJson);
    }

    System.out.println("About to save worker to database with verification details...");
    System.out.println("Worker ID: " + worker.getId());
    System.out.println("ID Proof URL: " + worker.getIdProofUrl());
    System.out.println("Selfie with ID URL: " + worker.getSelfieWithIdUrl());
    System.out.println("Certificate URLs: " + worker.getCertificateUrls());
    
    // Validate URLs are not image data
    if (worker.getIdProofUrl() != null && worker.getIdProofUrl().length() > 500) {
        System.err.println("WARNING: ID Proof URL seems too long, might be image data instead of URL: " + worker.getIdProofUrl().substring(0, 100) + "...");
    }
    if (worker.getSelfieWithIdUrl() != null && worker.getSelfieWithIdUrl().length() > 500) {
        System.err.println("WARNING: Selfie URL seems too long, might be image data instead of URL: " + worker.getSelfieWithIdUrl().substring(0, 100) + "...");
    }
    
    Worker savedWorker = repo.save(worker);
    
    System.out.println("Worker saved successfully after verification details update!");
    System.out.println("Saved Worker ID: " + savedWorker.getId());
    System.out.println("Saved ID Proof URL: " + savedWorker.getIdProofUrl());
    System.out.println("Saved Selfie with ID URL: " + savedWorker.getSelfieWithIdUrl());
    System.out.println("Saved Certificate URLs: " + savedWorker.getCertificateUrls());
    
    // Additional validation after save
    if (savedWorker.getIdProofUrl() != null && !savedWorker.getIdProofUrl().startsWith("http")) {
        System.err.println("ERROR: ID Proof URL doesn't start with http - might be corrupted: " + savedWorker.getIdProofUrl());
    }
    if (savedWorker.getSelfieWithIdUrl() != null && !savedWorker.getSelfieWithIdUrl().startsWith("http")) {
        System.err.println("ERROR: Selfie URL doesn't start with http - might be corrupted: " + savedWorker.getSelfieWithIdUrl());
    }
    
    return savedWorker;
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
private Worker getOrCreateWorker(Long workerId, String phoneNumber) {
    Worker worker;
    
    // First, try to find by workerId if provided
    if (workerId != null) {
        worker = repo.findById(workerId).orElse(null);
        if (worker != null) {
            System.out.println("Found existing worker by ID: " + workerId);
            return worker;
        }
    }
    
    // If no workerId or worker not found by ID, check by phone number
    if (phoneNumber != null && !phoneNumber.trim().isEmpty()) {
        Optional<Worker> existingWorker = findWorkerByPhone(phoneNumber.trim());
        if (existingWorker.isPresent()) {
            System.out.println("Found existing worker by phone: " + phoneNumber);
            return existingWorker.get();
        }
    }

    // Create a new worker with default values only if none exists
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
    System.out.println("Creating new worker record for phone: " + phoneNumber);

    return worker;
}

public void updateWorkerDocument(Long workerId, String fileType, String documentUrl) {
    Worker worker = getWorkerOrThrow(workerId);
    
    switch (fileType) {
        case "ID_PROOF":
            worker.setIdProofUrl(documentUrl);
            break;
        case "SELFIE_WITH_ID":
            worker.setSelfieWithIdUrl(documentUrl);
            break;
        case "CERTIFICATE":
            // For certificates, we might need to handle multiple files
            // For now, we'll store the last certificate URL
            worker.setCertificateUrls(documentUrl);
            break;
        default:
            throw new IllegalArgumentException("Invalid file type: " + fileType);
    }
    
    repo.save(worker);
    System.out.println("Updated worker document: " + fileType + " -> " + documentUrl);
}

public Worker updateVerificationDetails(Long workerId, String aadharNumber, String policeVerificationStatus) {
    try {
        Worker worker = getWorkerOrThrow(workerId);
        
        // Update verification details
        worker.setAadharNumber(aadharNumber);
        worker.setPoliceVerificationStatus(policeVerificationStatus);
        
        Worker savedWorker = repo.save(worker);
        System.out.println("Updated verification details for worker ID: " + workerId);
        
        return savedWorker;
    } catch (Exception e) {
        System.err.println("Error updating verification details: " + e.getMessage());
        e.printStackTrace();
        throw new RuntimeException("Failed to update verification details: " + e.getMessage(), e);
    }
}

private Worker getWorkerOrThrow(Long workerId) {
    if (workerId == null) {
        throw new IllegalArgumentException("Worker ID cannot be null");
    }
    return repo.findById(workerId)
            .orElseThrow(() -> new RuntimeException("Worker not found with ID: " + workerId));
}
}



