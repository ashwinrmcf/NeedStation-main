//package com.example.authbackend.controller;
//
//import com.example.authbackend.dto.OtpCallbackDTO;
//import com.example.authbackend.dto.OtpRequestDTO;
//import com.example.authbackend.dto.OtpResponseDTO;
//import com.example.authbackend.service.OtpService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.view.RedirectView;
//
//import jakarta.validation.Valid;
//
//@RestController
//@RequestMapping("/api/otp")
//public class OtpController {
//    private static final Logger logger = LoggerFactory.getLogger(OtpController.class);
//    private final OtpService otpService;
//
//    public OtpController(OtpService otpService) {
//        this.otpService = otpService;
//    }
//
//    @PostMapping("/send")
//    public ResponseEntity<OtpResponseDTO> sendOtp(@Valid @RequestBody OtpRequestDTO request) {
//        logger.info("Sending OTP to phone: {}", request.getPhoneNumber());
//        OtpResponseDTO response = otpService.sendOtp(request);
//        return ResponseEntity.ok(response);
//    }
//
//    @PostMapping("/callback")
//    public ResponseEntity<Void> otpCallback(@RequestBody OtpCallbackDTO callback) {
//        logger.info("Received OTP callback for ID: {}, status: {}",
//                callback.getOtpId(), callback.getAuthStatus());
//        otpService.processCallback(callback);
//        return ResponseEntity.ok().build();
//    }
//
//    @GetMapping("/verify/{otpId}")
//    public ResponseEntity<Boolean> verifyOtp(@PathVariable String otpId) {
//        boolean verified = otpService.isVerified(otpId);
//        return ResponseEntity.ok(verified);
//    }
//
//    @GetMapping("/success")
//    public RedirectView otpSuccess(@RequestParam("otp_id") String otpId) {
//        logger.info("OTP success redirect for ID: {}", otpId);
//        // Redirect to frontend success page with the OTP ID
//        return new RedirectView("/verification-success?otpId=" + otpId);
//    }
//
//    @GetMapping("/fail")
//    public RedirectView otpFail(@RequestParam("otp_id") String otpId) {
//        logger.info("OTP failure redirect for ID: {}", otpId);
//        // Redirect to frontend failure page with the OTP ID
//        return new RedirectView("/verification-failed?otpId=" + otpId);
//    }
//}
//
//
