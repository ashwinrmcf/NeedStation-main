package com.example.authbackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.example.authbackend.model.Worker;
import com.example.authbackend.repository.WorkerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CloudinaryUploadServiceTest {

    @Mock
    private Cloudinary cloudinary;

    @Mock
    private Uploader uploader;

    @Mock
    private WorkerRepository workerRepository;

    @InjectMocks
    private WorkerService workerService;

    private MultipartFile mockFile;
    private Map<String, Object> mockCloudinaryResponse;

    @BeforeEach
    void setUp() {
        // Create mock file
        mockFile = new MockMultipartFile(
            "test-image.jpg",
            "test-image.jpg",
            "image/jpeg",
            "test image content".getBytes()
        );

        // Create mock Cloudinary response
        mockCloudinaryResponse = new HashMap<>();
        mockCloudinaryResponse.put("secure_url", "https://res.cloudinary.com/test/image/upload/v123456/test_image.jpg");
        mockCloudinaryResponse.put("public_id", "test_image_123");
        mockCloudinaryResponse.put("url", "http://res.cloudinary.com/test/image/upload/v123456/test_image.jpg");
        mockCloudinaryResponse.put("resource_type", "image");
        mockCloudinaryResponse.put("format", "jpg");

        // Mock cloudinary uploader
        when(cloudinary.uploader()).thenReturn(uploader);
    }

    @Test
    void testUploadImage_Success() throws IOException {
        // Arrange
        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(mockCloudinaryResponse);

        // Act
        String result = workerService.uploadImage(mockFile);

        // Assert
        assertNotNull(result);
        assertEquals("https://res.cloudinary.com/test/image/upload/v123456/test_image.jpg", result);
        assertTrue(result.contains("cloudinary.com"));
        assertTrue(result.startsWith("https://"));

        // Verify cloudinary upload was called
        verify(uploader, times(1)).upload(any(byte[].class), any(Map.class));
    }

    @Test
    void testUploadImage_NullFile() throws IOException {
        // Act
        String result = workerService.uploadImage(null);

        // Assert
        assertNull(result);
        verify(uploader, never()).upload(any(), any());
    }

    @Test
    void testUploadImage_EmptyFile() throws IOException {
        // Arrange
        MultipartFile emptyFile = new MockMultipartFile(
            "empty.jpg",
            "empty.jpg",
            "image/jpeg",
            new byte[0]
        );

        // Act
        String result = workerService.uploadImage(emptyFile);

        // Assert
        assertNull(result);
        verify(uploader, never()).upload(any(), any());
    }

    @Test
    void testUploadImage_CloudinaryException() throws IOException {
        // Arrange
        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenThrow(new IOException("Cloudinary upload failed"));

        // Act
        String result = workerService.uploadImage(mockFile);

        // Assert
        assertNull(result);
        verify(uploader, times(1)).upload(any(byte[].class), any(Map.class));
    }

    @Test
    void testUploadImage_NoSecureUrl() throws IOException {
        // Arrange
        Map<String, Object> responseWithoutSecureUrl = new HashMap<>();
        responseWithoutSecureUrl.put("public_id", "test_image_123");
        responseWithoutSecureUrl.put("url", "http://res.cloudinary.com/test/image/upload/v123456/test_image.jpg");

        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(responseWithoutSecureUrl);

        // Act
        String result = workerService.uploadImage(mockFile);

        // Assert
        assertEquals("http://res.cloudinary.com/test/image/upload/v123456/test_image.jpg", result);
    }

    @Test
    void testUploadImage_ValidatesCloudinaryUrl() throws IOException {
        // Arrange
        Map<String, Object> invalidResponse = new HashMap<>();
        invalidResponse.put("secure_url", "https://invalid-domain.com/image.jpg");

        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(invalidResponse);

        // Act
        String result = workerService.uploadImage(mockFile);

        // Assert
        assertNotNull(result);
        assertEquals("https://invalid-domain.com/image.jpg", result);
        // Note: The service logs a warning but still returns the URL
    }

    @Test
    void testUploadMultipleFiles_Success() throws IOException {
        // Arrange
        Map<String, MultipartFile> files = new HashMap<>();
        files.put("profile", mockFile);
        files.put("idProof", new MockMultipartFile(
            "id-proof.jpg",
            "id-proof.jpg", 
            "image/jpeg",
            "id proof content".getBytes()
        ));

        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(mockCloudinaryResponse);

        // Act
        Map<String, String> results = workerService.uploadMultipleFiles(files);

        // Assert
        assertEquals(2, results.size());
        assertTrue(results.containsKey("profile"));
        assertTrue(results.containsKey("idProof"));
        assertEquals("https://res.cloudinary.com/test/image/upload/v123456/test_image.jpg", results.get("profile"));
        assertEquals("https://res.cloudinary.com/test/image/upload/v123456/test_image.jpg", results.get("idProof"));

        verify(uploader, times(2)).upload(any(byte[].class), any(Map.class));
    }

    @Test
    void testUploadMultipleFiles_SkipsNullFiles() throws IOException {
        // Arrange
        Map<String, MultipartFile> files = new HashMap<>();
        files.put("profile", mockFile);
        files.put("idProof", null);

        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(mockCloudinaryResponse);

        // Act
        Map<String, String> results = workerService.uploadMultipleFiles(files);

        // Assert
        assertEquals(1, results.size());
        assertTrue(results.containsKey("profile"));
        assertFalse(results.containsKey("idProof"));

        verify(uploader, times(1)).upload(any(byte[].class), any(Map.class));
    }

    @Test
    void testTestCloudinaryConnection_Success() throws IOException {
        // Arrange
        Map<String, Object> testResponse = new HashMap<>();
        testResponse.put("public_id", "fresh_test_123456");
        testResponse.put("secure_url", "https://res.cloudinary.com/test/raw/upload/v123456/test_uploads/fresh_test_123456");

        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(testResponse);

        // Act
        Map<String, Object> result = workerService.testCloudinaryConnection();

        // Assert
        assertTrue((Boolean) result.get("success"));
        assertEquals("fresh_test_123456", result.get("publicId"));
        assertTrue(result.get("secureUrl").toString().contains("cloudinary.com"));
        assertNotNull(result.get("timestamp"));

        verify(uploader, times(1)).upload(any(byte[].class), any(Map.class));
    }

    @Test
    void testTestCloudinaryConnection_Failure() throws IOException {
        // Arrange
        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenThrow(new IOException("Connection failed"));

        // Act
        Map<String, Object> result = workerService.testCloudinaryConnection();

        // Assert
        assertFalse((Boolean) result.get("success"));
        assertEquals("Connection failed", result.get("error"));
        assertNotNull(result.get("stackTrace"));
    }

    @Test
    void testUploadImage_FileTypeValidation() throws IOException {
        // Test different file types
        MultipartFile pngFile = new MockMultipartFile(
            "test.png", "test.png", "image/png", "png content".getBytes()
        );
        MultipartFile pdfFile = new MockMultipartFile(
            "test.pdf", "test.pdf", "application/pdf", "pdf content".getBytes()
        );

        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(mockCloudinaryResponse);

        // Test PNG upload
        String pngResult = workerService.uploadImage(pngFile);
        assertNotNull(pngResult);

        // Test PDF upload
        String pdfResult = workerService.uploadImage(pdfFile);
        assertNotNull(pdfResult);

        verify(uploader, times(2)).upload(any(byte[].class), any(Map.class));
    }

    @Test
    void testUploadImage_LargeFile() throws IOException {
        // Arrange - Create a large file (5MB)
        byte[] largeContent = new byte[5 * 1024 * 1024];
        MultipartFile largeFile = new MockMultipartFile(
            "large.jpg", "large.jpg", "image/jpeg", largeContent
        );

        when(uploader.upload(any(byte[].class), any(Map.class)))
            .thenReturn(mockCloudinaryResponse);

        // Act
        String result = workerService.uploadImage(largeFile);

        // Assert
        assertNotNull(result);
        verify(uploader, times(1)).upload(any(byte[].class), any(Map.class));
    }
}
