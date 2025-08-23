# NeedStation Spring Boot API Testing Guide

## Overview
This guide provides comprehensive testing instructions for the NeedStation Spring Boot backend APIs, including the Contact Form service and Rule-Based Chatbot functionality.

## Prerequisites
- Spring Boot application running on `http://localhost:8080`
- Postman installed (or any REST client)
- Import the provided Postman collection: `NeedStation-Spring-API-Tests.postman_collection.json`

## API Endpoints

### 1. Contact Form API

#### Base URL: `http://localhost:8080/api/contact`

#### Health Check
- **Method:** GET
- **URL:** `http://localhost:8080/api/contact/health`
- **Expected Response:** `"Contact service is running"`

#### Submit Contact Form
- **Method:** POST
- **URL:** `http://localhost:8080/api/contact`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject": "Plumbing Service Inquiry",
    "message": "Hi, I need help with a leaking pipe in my kitchen. Can you provide a quote for repair services?"
}
```

#### Expected Success Response:
```json
{
    "success": true,
    "message": "Contact form submitted successfully. We'll get back to you soon!",
    "timestamp": "2025-08-23T21:30:00"
}
```

#### Validation Test Cases:
1. **Missing Name:** Should return validation error
2. **Invalid Email:** Should return email format error
3. **Empty Subject:** Should return required field error
4. **Message Too Long:** Should return length validation error (>2000 chars)

### 2. Rule-Based Chatbot API

#### Base URL: `http://localhost:8080/api/chatbot`

#### Chat Request
- **Method:** POST
- **URL:** `http://localhost:8080/api/chatbot`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
    "message": "your query here"
}
```

#### Response Format:
```json
{
    "message": "Response text",
    "redirectUrl": "/path/to/page",
    "redirectButtonText": "Button Text"
}
```

## Test Scenarios

### Navigation Intents
Test these queries to verify navigation functionality:

1. **Home Navigation:**
   - Query: `"take me to home page"` or `"homepage"`
   - Expected: Redirect to `/` with "Go to Home" button

2. **Services Navigation:**
   - Query: `"show me your services"` or `"what services"`
   - Expected: Redirect to `/services` with "View Services" button

3. **Contact Navigation:**
   - Query: `"how can I contact you?"` or `"contact"`
   - Expected: Redirect to `/contact-us` with "Contact Us" button

4. **About Navigation:**
   - Query: `"tell me about your company"` or `"about us"`
   - Expected: Redirect to `/about-us` with "About Us" button

### Service Queries
Test these service-related queries:

1. **Plumbing:** `"I need a plumber for pipe repair"`
2. **Electrical:** `"electrical wiring problem"`
3. **Cleaning:** `"house cleaning service needed"`
4. **Water Supply:** `"water tank cleaning required"`

### General Queries
1. **Pricing:** `"what are your prices?"`
2. **Booking:** `"how to book an appointment?"`
3. **Emergency:** `"emergency plumbing help needed!"`
4. **Default:** `"random unrelated query"`
5. **Empty Message:** `""` (empty string)

## Expected Behavior

### Contact Form
- ✅ Valid submissions should send emails to support and user
- ✅ Validation errors should return appropriate error messages
- ✅ Health check should confirm service availability

### Chatbot
- ✅ Navigation queries should return redirect URLs and button text
- ✅ Service queries should provide relevant information
- ✅ Unrecognized queries should return default helpful response
- ✅ Empty messages should return greeting message

## Email Configuration
The contact form sends emails using the following configuration:
- **From:** `ashwinrmcf@gmail.com` (configured in application.properties)
- **To:** `needstation3@gmail.com` (support email)
- **Auto-reply:** Sent to user's email address

## Troubleshooting

### Common Issues:
1. **Port 8080 not available:** Ensure no other services are running on port 8080
2. **Email not sending:** Check Gmail SMTP configuration and app password
3. **Validation errors:** Ensure request body matches expected JSON format
4. **CORS errors:** Frontend origins are configured for localhost:3000, 5173, 5174

### Debug Steps:
1. Check application logs for detailed error messages
2. Verify database connectivity (if applicable)
3. Test health check endpoint first
4. Ensure proper JSON formatting in requests

## Integration with Frontend
The React frontend should:
- Send contact form data to `/api/contact`
- Send chatbot messages to `/api/chatbot`
- Handle redirect URLs from chatbot responses
- Display appropriate error messages for validation failures

## Cost Benefits
This rule-based chatbot implementation:
- ❌ **No API costs** (replaced expensive Gemini API)
- ✅ **Fast responses** (no external API calls)
- ✅ **Reliable** (no dependency on external services)
- ✅ **Customizable** (easily add new rules and responses)
- ✅ **Navigation support** (seamless integration with React routes)
