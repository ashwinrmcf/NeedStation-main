# NeedStation Contact API - Postman Tests

## 📋 **API Endpoints**

### **Base URL**: `http://localhost:8080`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contact/health` | Health check for contact service |
| POST | `/api/contact` | Submit contact form |

---

## 🚀 **Quick Setup**

1. **Import Collection**: Import `NeedStation-Contact-API-Tests.postman_collection.json` into Postman
2. **Start Spring Boot**: `mvn spring-boot:run` in `/Backend/authbackend`
3. **Run Tests**: Execute collection or individual requests

---

## 📧 **POST /api/contact**

### **Request Body**:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com", 
    "subject": "Test Contact Form",
    "message": "This is a test message from Postman."
}
```

### **Success Response (200)**:
```json
{
    "success": true,
    "message": "Message sent successfully!",
    "timestamp": "2025-08-23T19:47:53.123456"
}
```

### **Error Response (400)**:
```json
{
    "success": false,
    "message": "Name is required",
    "timestamp": "2025-08-23T19:47:53.123456"
}
```

---

## ✅ **Test Scenarios**

### **1. Health Check**
- **URL**: `GET http://localhost:8080/api/contact/health`
- **Expected**: Status 200, "Contact service is running"

### **2. Valid Contact Form**
- **URL**: `POST http://localhost:8080/api/contact`
- **Body**: Complete valid form data
- **Expected**: Status 200, success: true

### **3. Missing Required Fields**
- **Test**: Submit without name, email, subject, or message
- **Expected**: Status 400, validation error

### **4. Invalid Email Format**
- **Test**: Submit with invalid email (e.g., "invalid-email")
- **Expected**: Status 400, "Invalid email format"

### **5. Field Length Validation**
- **Test**: Submit with message > 2000 characters
- **Expected**: Status 400, length validation error

---

## 🔧 **Manual Testing**

### **Using cURL**:
```bash
# Health Check
curl -X GET http://localhost:8080/api/contact/health

# Submit Contact Form
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "API Test",
    "message": "Testing the contact API endpoint."
  }'
```

### **Using Browser (Health Check)**:
Navigate to: `http://localhost:8080/api/contact/health`

---

## 📧 **Email Flow**

When you submit a valid contact form:

1. **Support Email** (`needstation3@gmail.com`) receives the contact form
2. **User Email** receives auto-reply confirmation
3. **Emails sent from** `ashwinrmcf@gmail.com`

---

## 🛠️ **Troubleshooting**

| Issue | Solution |
|-------|----------|
| Connection refused | Start Spring Boot server |
| 401/403 errors | Check CORS configuration |
| Email not sending | Verify Gmail credentials in `application.properties` |
| Validation errors | Check request body format |

---

## 📝 **Validation Rules**

- **Name**: Required, max 100 characters
- **Email**: Required, valid email format
- **Subject**: Required, max 200 characters  
- **Message**: Required, max 2000 characters
