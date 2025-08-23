# Two-Step Signup with Email OTP Verification

## Overview
The signup process now consists of three steps:
1. **Step 1**: Enter username and email → Send OTP
2. **Step 2**: Verify OTP from email
3. **Step 3**: Set password and confirm password → Create account

## Backend API Endpoints

### 1. Step 1 - Send OTP
- **Endpoint**: `POST /api/auth/signup/step1`
- **Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

### 2. Verify OTP
- **Endpoint**: `POST /api/auth/signup/verify-otp`
- **Request Body**:
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

### 3. Step 2 - Complete Registration
- **Endpoint**: `POST /api/auth/signup/step2`
- **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securepassword",
  "confirmPassword": "securepassword"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### 4. Resend OTP
- **Endpoint**: `POST /api/auth/signup/resend-otp`
- **Request Body**:
```json
{
  "email": "john@example.com"
}
```

## Frontend Flow

### Step 1: Username & Email
- User enters username and email
- Form validates required fields
- Calls `/api/auth/signup/step1`
- On success, moves to Step 2 (OTP verification)

### Step 2: OTP Verification
- Shows email where OTP was sent
- User enters 6-digit OTP
- Calls `/api/auth/signup/verify-otp`
- Includes "Resend code" option
- On success, moves to Step 3 (password setup)

### Step 3: Password Setup
- User enters password and confirmation
- Validates passwords match
- Calls `/api/auth/signup/step2`
- On success, redirects to login page

## Design Features Maintained

✅ **Same styling** as original signup page
✅ **Same layout** and form structure
✅ **Google Sign-In** option still available on Step 1
✅ **Terms of Service** links preserved
✅ **Loading states** with disabled buttons
✅ **Error/success messages** displayed consistently

## Email Configuration

The system uses Gmail SMTP for sending OTP emails. Make sure your `application.properties` has:

```properties
# Gmail SMTP Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-gmail@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

## Security Features

- **OTP Expiry**: OTPs expire after 10 minutes
- **Email Validation**: Server-side email format validation
- **Username/Email Uniqueness**: Checks for existing users
- **Password Validation**: Minimum 6 characters required
- **Password Confirmation**: Must match original password
- **Automatic Cleanup**: OTP data cleared after successful registration

## Testing the Flow

### 1. Start Backend
```bash
cd d:\NeedStation-main\Backend\authbackend
.\mvnw.cmd spring-boot:run
```

### 2. Start Frontend
```bash
cd d:\NeedStation-main\Frontend\Need_Station_MP-main
npm start
```

### 3. Test Signup Process
1. Navigate to `http://localhost:3000/signup`
2. Enter username and email → Click "Continue"
3. Check email for 6-digit OTP
4. Enter OTP → Click "Verify"
5. Set password and confirm → Click "Create Account"
6. Should redirect to login page

### 4. Test Error Cases
- Try existing username/email
- Enter invalid OTP
- Try mismatched passwords
- Test OTP expiry (wait 10+ minutes)

## Database Schema

The User table now includes:
- `full_name` - For Google OAuth users
- `auth_provider` - "LOCAL" for email signup, "GOOGLE" for OAuth
- `is_verified` - Auto-set to true for email-verified users

## Benefits

✅ **Enhanced Security**: Email verification prevents fake accounts
✅ **Better UX**: Clear step-by-step process
✅ **Spam Prevention**: Verified email addresses only
✅ **Professional Feel**: Similar to major platforms
✅ **Flexible**: Supports both email and Google signup

## Troubleshooting

### Common Issues:
1. **OTP not received**: Check spam folder, verify Gmail SMTP config
2. **OTP expired**: Use "Resend code" button
3. **Username exists**: Try different username
4. **Email exists**: User may already have account

### Debug Steps:
1. Check Spring Boot console for email sending logs
2. Verify Gmail App Password is correct
3. Test with different email providers
4. Check network connectivity for SMTP

The two-step signup process is now fully implemented and ready for testing!
