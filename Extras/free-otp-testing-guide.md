# Free OTP API Testing Guide

This document provides step-by-step instructions for testing the Free OTP API integration in the NeedStation application.

## Prerequisites

Before testing, make sure:

1. Your Spring Boot application is running on port 8080
2. The Free OTP API service is running on port 3030 (use `docker-compose up free-otp-api`)
3. Your database is properly configured and accessible

## Testing Tools Provided

Two testing tools have been created for you:

1. **free-otp-test.http**: HTTP request file that can be used with the REST Client extension in VS Code or other HTTP clients
2. **free-otp-test-runner.java**: Java application to interactively test the Free OTP API

## Test Cases

### 1. Basic Functionality Tests

#### 1.1. Service Status Check
- **Test**: Verify the Free OTP API service is accessible
- **Using HTTP file**: Run the "Check Free OTP API Service Status" request
- **Using test runner**: Select option 1
- **Expected result**: Status 200 OK with "status": "ok" in the response

#### 1.2. Get Phone Numbers 
- **Test**: Retrieve available phone numbers for India
- **Using HTTP file**: Run the "Get Available Phone Numbers for India" request
- **Using test runner**: Select option 2
- **Expected result**: Status 200 OK with a list of phone numbers

#### 1.3. Listen for OTP
- **Test**: Listen for OTP messages on a specific phone number
- **Using HTTP file**: Run the "Listen for OTP on a Specific Phone Number" request (update with a valid phone number)
- **Using test runner**: Select option 3 and follow the prompts
- **Expected result**: Status 200 OK with OTP information if received within timeout

### 2. Worker Registration Flow

#### 2.1. Worker Registration (Step 1)
- **Test**: Register a new worker, which should trigger OTP generation
- **Using HTTP file**: Run the "Test Worker Registration with Free OTP (Step 1)" request
- **Using test runner**: Select option 4
- **Expected result**: Status 200 OK with worker ID and registration status

#### 2.2. OTP Verification
- **Test**: Verify the OTP for a registered worker
- **Using HTTP file**: Run the "Test OTP Verification" request (update with correct worker ID)
- **Using test runner**: Select option 5 and follow the prompts
- **Expected result**: Status 200 OK with verification success message

### 3. Security Feature Tests

#### 3.1. Rate Limiting
- **Test**: Verify that rate limiting is working correctly
- **Using HTTP file**: Run the "Test Rate Limiting" request multiple times in quick succession
- **Using test runner**: Select option 6
- **Expected result**: After several requests, should receive status 429 Too Many Requests

#### 3.2. Security Filter
- **Test**: Verify that the security filter is protecting OTP endpoints
- **Using HTTP file**: Run the "Test Security Filter" request multiple times in quick succession
- **Using test runner**: Select option 7
- **Expected result**: After several requests, should receive status 429 Too Many Requests

#### 3.3. OTP Expiration
- **Test**: Verify that OTPs expire after the configured time
- **Manual test**: Register a worker, wait for more than 10 minutes, then try to verify with an OTP
- **Expected result**: Verification should fail with an "OTP expired" message

#### 3.4. Account Lockout
- **Test**: Verify that accounts are locked after multiple failed attempts
- **Manual test**: Try to verify with incorrect OTPs multiple times
- **Expected result**: After 5 failed attempts, verification should fail with a lockout message

## Debugging Tips

If you encounter issues while testing:

1. **Check application logs**: Look for error messages in your Spring Boot application logs
2. **Verify Docker container**: Make sure the Free OTP API Docker container is running (`docker ps`)
3. **Check database**: Verify that worker records are being created with proper OTP-related fields
4. **Network connectivity**: Ensure your application can connect to the Free OTP API service

## Advanced Testing

For more advanced testing scenarios:

1. **Load testing**: Use a tool like JMeter to test how the system handles multiple simultaneous OTP requests
2. **Failover testing**: Stop the Free OTP API service to verify that the fallback mechanisms work
3. **Security testing**: Use tools like OWASP ZAP to check for security vulnerabilities in the API endpoints

## Troubleshooting

Common issues and solutions:

1. **429 Too Many Requests**: Wait for the rate limit window to expire (15 minutes) or restart the application
2. **Account locked**: Reset the failed attempts counter in the database or wait for the lockout period to expire
3. **OTP not being received**: Check that the Free OTP API service is properly scraping SMS messages
4. **Encryption errors**: Verify that the encryption key is properly configured in application.properties
