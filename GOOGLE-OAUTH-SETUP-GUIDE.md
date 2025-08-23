# Google OAuth Setup Guide for NeedStation

## Overview
This guide walks you through setting up Google Sign-In (GSI) for NeedStation's authentication system.

## Prerequisites
- Google Cloud Console account
- NeedStation Spring Boot backend running
- React frontend setup

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "NeedStation" or similar

### 1.2 Enable Google+ API
1. Navigate to **APIs & Services** > **Library**
2. Search for "Google+ API"
3. Click **Enable**

### 1.3 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth 2.0 Client IDs**
3. Configure consent screen if prompted:
   - Application name: "NeedStation"
   - User support email: your email
   - Developer contact: your email
4. Application type: **Web application**
5. Name: "NeedStation Web Client"
6. Authorized JavaScript origins:
   ```
   http://localhost:3000
   http://localhost:5173
   http://localhost:5174
   ```
7. Authorized redirect URIs:
   ```
   http://localhost:8080/auth/google/callback
   ```
8. Click **Create**
9. Copy the **Client ID** and **Client Secret**

## Step 2: Backend Configuration

### 2.1 Update application.properties
Replace the placeholders in `d:\NeedStation-main\Backend\authbackend\src\main\resources\application.properties`:

```properties
# Google OAuth2 Configuration
google.oauth.client-id=YOUR_ACTUAL_GOOGLE_CLIENT_ID
google.oauth.client-secret=YOUR_ACTUAL_GOOGLE_CLIENT_SECRET
google.oauth.redirect-uri=http://localhost:8080/auth/google/callback
```

### 2.2 Restart Spring Boot Application
```bash
cd d:\NeedStation-main\Backend\authbackend
.\mvnw.cmd spring-boot:run
```

## Step 3: Frontend Configuration

### 3.1 Update Login Component
In `d:\NeedStation-main\Frontend\Need_Station_MP-main\src\pages\LoginPage\Login.jsx`, replace:
```javascript
client_id: "YOUR_GOOGLE_CLIENT_ID"
```
With your actual Google Client ID.

### 3.2 Update Signup Component
In `d:\NeedStation-main\Frontend\Need_Station_MP-main\src\pages\SignupPage\Signup.jsx`, replace:
```javascript
client_id: "YOUR_GOOGLE_CLIENT_ID"
```
With your actual Google Client ID.

## Step 4: API Endpoints

### 4.1 Google Authentication
- **Endpoint:** `POST http://localhost:8080/api/auth/google`
- **Request Body:**
```json
{
  "idToken": "google_id_token_from_frontend"
}
```

- **Success Response:**
```json
{
  "success": true,
  "message": "Google authentication successful",
  "token": "jwt_token_for_user",
  "user": {
    "email": "user@gmail.com",
    "name": "User Name",
    "picture": "profile_picture_url"
  }
}
```

### 4.2 Health Check
- **Endpoint:** `GET http://localhost:8080/api/auth/google/status`
- **Response:** `"Google authentication service is running"`

## Step 5: Testing

### 5.1 Test Backend
Use Postman to test the Google auth endpoint:
1. Get a valid Google ID token from frontend
2. POST to `http://localhost:8080/api/auth/google`
3. Verify user creation in database

### 5.2 Test Frontend
1. Start React development server
2. Navigate to login/signup pages
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Verify successful authentication

## Step 6: Database Schema Updates

The User table will be automatically updated with new fields:
- `full_name` - User's display name from Google
- `auth_provider` - Set to "GOOGLE" for Google users
- `is_verified` - Automatically true for Google users

## Security Considerations

1. **Client ID Security:** Client ID can be public, but keep Client Secret secure
2. **HTTPS in Production:** Use HTTPS URLs for production
3. **Token Validation:** Backend validates Google ID tokens server-side
4. **CORS Configuration:** Properly configured for your domains

## Troubleshooting

### Common Issues:
1. **"Invalid Client ID":** Check client ID matches exactly
2. **CORS Errors:** Verify authorized origins in Google Console
3. **Token Verification Failed:** Ensure Google API client library is working
4. **Database Errors:** Check User model has required fields

### Debug Steps:
1. Check browser console for JavaScript errors
2. Verify Google Sign-In script loads properly
3. Check Spring Boot logs for authentication errors
4. Test with different Google accounts

## Production Deployment

For production:
1. Update authorized origins to your production domain
2. Use environment variables for sensitive config
3. Enable HTTPS
4. Update CORS settings for production URLs

## Benefits of Google Sign-In Integration

✅ **Improved User Experience:** One-click authentication
✅ **Reduced Friction:** No password creation/management
✅ **Enhanced Security:** Google's robust authentication
✅ **Faster Onboarding:** Instant user registration
✅ **Trusted Provider:** Users trust Google authentication
