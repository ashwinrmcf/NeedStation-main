# Free OTP API Implementation for NeedStation

This document explains how to use the Free OTP API service that has been integrated into the NeedStation backend for OTP (One-Time Password) services with enhanced security measures.

## Overview

The Free OTP API provides a way to receive SMS messages and extract OTP codes from various disposable phone number services. This has been integrated into your existing worker registration and login flows as an alternative to Twilio, with additional security enhancements to make the implementation safer for production use.

## Setup and Running the Service

### 1. Start the Free OTP API Service

The Free OTP API has been configured to run using Docker Compose. To start the service:

```bash
cd f:\GITHUB\NeedStation-main
docker-compose up free-otp-api
```

This will start the Free OTP API service on port 3030.

### 2. Configuration

The integration is already configured in your application.properties:

```properties
# Free OTP API Configuration
free-otp.base-url=http://localhost:3030
free-otp.default-source=ReceiveSmsFree
free-otp.timeout-seconds=60
use-free-otp=true

# OTP Security Configuration
otp.encryption.key=NeedStation_OTP_Secret_Key_2025
otp.validation.strict=true
```

You can toggle between using Twilio and Free OTP API by changing the `use-free-otp` property to `true` or `false`.

## How It Works

### Architecture

1. `FreeOtpService`: Java service that interacts with the Free OTP API
2. `FreeOtpConfig`: Configuration class that loads properties from application.properties
3. `FreeOtpController`: REST controller that provides endpoints to test the Free OTP API directly
4. `RateLimiter`: Service that prevents abuse of the OTP system by limiting requests
5. `OtpEncryptionUtil`: Utility for encrypting and decrypting OTP values
6. `OtpSecurityFilter`: Security filter that protects OTP endpoints

### Flow

1. When a user registers, the system calls the `generateAndSendOtp` method
2. If `use-free-otp` is `true`, it will use the Free OTP API to obtain a phone number and listen for OTP
3. The system also generates a secure backup OTP, encrypts it, and stores it in the database
4. When the user enters an OTP, the system calls the `verifyOtp` method
5. The system attempts to verify the OTP through both the encrypted backup OTP and the Free OTP API
6. Rate limiting and security checks are performed at each step

### Fallback Mechanism

The implementation includes multiple fallback mechanisms with enhanced security:

1. First tries to verify against the encrypted backup OTP stored in the database
2. Then checks with the Free OTP API if strict validation is enabled
3. If Free OTP API fails, it falls back to Twilio (if enabled)
4. If Twilio fails, it falls back to Free OTP API (if enabled)
5. All fallbacks implement proper rate limiting and account lockout protection

## Testing the Implementation

### API Endpoints

The following endpoints are available for testing:

#### 1. Check Free OTP API Status

```
GET /api/free-otp/status
```

This endpoint checks if the Free OTP API service is running and can return phone numbers.

#### 2. Get a Phone Number

```
GET /api/free-otp/phone/{country}
```

This endpoint returns an available phone number for the specified country.
Example: `/api/free-otp/phone/in` for India

#### 3. Listen for OTP

```
GET /api/free-otp/listen/{country}/{phoneNumber}?matcher={pattern}&timeoutSeconds={seconds}
```

This endpoint listens for OTP messages on the specified phone number.
Parameters:
- `country`: Country code (e.g., "in" for India)
- `phoneNumber`: Phone number without "+" prefix
- `matcher` (optional): Regex pattern to match in SMS
- `timeoutSeconds` (optional): Timeout in seconds (default 60)

Example: `/api/free-otp/listen/in/919876543210?timeoutSeconds=30`

### Using with Worker Registration

The Free OTP API has been integrated with the existing worker registration and login flows. The system will:

1. Attempt to use the Free OTP API for OTP generation and verification
2. Fall back to Twilio if Free OTP API is not working
3. Use a test OTP as the last resort

## Troubleshooting

### Service Not Starting

If the Free OTP API service doesn't start, check:

1. Docker is running
2. The port 3030 is not being used by another application
3. There are no errors in the Docker logs

### OTP Verification Failures

If OTP verification fails:

1. Check that the Free OTP API service is running
2. Ensure the phone number is in the correct format
3. Make sure the OTP is entered within the expiration time (10 minutes)
4. Check the application logs for any errors

## Security Enhancements

This implementation includes several security features to make it safer for production use:

### 1. Rate Limiting

The `RateLimiter` class provides protection against brute force attacks:

- Limits OTP requests per IP address (10 requests per 15 minutes)
- Limits OTP requests per phone number (5 requests per 15 minutes)
- Automatically clears expired rate limit entries to prevent memory leaks

### 2. Account Lockout

After 5 failed verification attempts for a phone number, the account is temporarily locked:

- Prevents brute force attacks on specific accounts
- Counter resets after successful verification
- Can be manually reset if needed

### 3. OTP Encryption

The `OtpEncryptionUtil` class provides secure storage of OTP values:

- Uses AES-GCM encryption for stored OTP values
- Unique initialization vector (IV) for each encryption
- Configurable encryption key in application.properties

### 4. Secure Backup OTP

In addition to using the free OTP API:

- System generates a secure random backup OTP for each request
- Backup OTP is encrypted before storage in the database
- Verification first checks against this encrypted backup OTP

### A Security Filter

The `OtpSecurityFilter` protects all OTP-related endpoints:

- Applies rate limiting to all OTP endpoints
- Handles proxy servers correctly when determining client IP
- Returns appropriate HTTP 429 responses for rate-limited requests

## Production Considerations

For production use:

1. Configure appropriate timeouts for OTP verification
2. Consider security implications of using disposable phone numbers
3. Balance between Twilio (paid but reliable) and Free OTP API (free but less reliable)
4. Regularly rotate the encryption key used for OTP storage
5. Monitor for unusual patterns in OTP requests

The integration has been designed with security as a priority while maintaining high availability by using multiple fallback mechanisms.
