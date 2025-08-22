/*
 * Free OTP API Integration Test Runner
 * To use this test script, copy it to a test directory in your project
 * and run it as a Java application.
 */

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Scanner;

public class FreeOtpTestRunner {
    
    private static final String BASE_URL = "http://localhost:8080";
    private static final HttpClient client = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    
    public static void main(String[] args) throws Exception {
        System.out.println("===== Free OTP API Integration Test Runner =====");
        System.out.println("This script will help you test the Free OTP API integration");
        System.out.println("Ensure your Spring Boot application is running on port 8080");
        System.out.println("and the Free OTP API is running on port 3030\n");
        
        Scanner scanner = new Scanner(System.in);
        boolean running = true;
        
        while (running) {
            printMenu();
            System.out.print("Choose a test (0-7): ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline
            
            switch (choice) {
                case 0:
                    running = false;
                    break;
                case 1:
                    testServiceStatus();
                    break;
                case 2:
                    testGetPhoneNumbers();
                    break;
                case 3:
                    System.out.print("Enter country code (e.g., in): ");
                    String country = scanner.nextLine();
                    System.out.print("Enter phone number (without +): ");
                    String phone = scanner.nextLine();
                    testListenForOtp(country, phone);
                    break;
                case 4:
                    testWorkerRegistration();
                    break;
                case 5:
                    System.out.print("Enter worker ID: ");
                    long workerId = scanner.nextLong();
                    scanner.nextLine(); // consume newline
                    System.out.print("Enter OTP: ");
                    String otp = scanner.nextLine();
                    testOtpVerification(workerId, otp);
                    break;
                case 6:
                    testRateLimiting();
                    break;
                case 7:
                    testSecurityFilter();
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
            
            System.out.println("\nPress Enter to continue...");
            scanner.nextLine();
        }
        
        System.out.println("Test runner closed.");
        scanner.close();
    }
    
    private static void printMenu() {
        System.out.println("\n===== Test Menu =====");
        System.out.println("1. Test Free OTP API Service Status");
        System.out.println("2. Test Get Available Phone Numbers");
        System.out.println("3. Test Listen for OTP");
        System.out.println("4. Test Worker Registration with Free OTP");
        System.out.println("5. Test OTP Verification");
        System.out.println("6. Test Rate Limiting");
        System.out.println("7. Test Security Filter");
        System.out.println("0. Exit");
    }
    
    private static void testServiceStatus() throws Exception {
        System.out.println("\n----- Testing Free OTP API Service Status -----");
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/free-otp/status"))
                .header("Accept", "application/json")
                .GET()
                .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
    
    private static void testGetPhoneNumbers() throws Exception {
        System.out.println("\n----- Testing Get Available Phone Numbers -----");
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/free-otp/phone/in"))
                .header("Accept", "application/json")
                .GET()
                .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
    
    private static void testListenForOtp(String country, String phone) throws Exception {
        System.out.println("\n----- Testing Listen for OTP -----");
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/free-otp/listen/" + country + "/" + phone + "?timeoutSeconds=10"))
                .header("Accept", "application/json")
                .GET()
                .build();
        
        System.out.println("Listening for OTP on " + phone + " (this may take up to 10 seconds)...");
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
    
    private static void testWorkerRegistration() throws Exception {
        System.out.println("\n----- Testing Worker Registration with Free OTP -----");
        
        String requestBody = "{"
                + "\"fullName\": \"Test User\","
                + "\"gender\": \"Male\","
                + "\"dob\": \"1990-01-01\","
                + "\"phone\": \"9876543210\","
                + "\"email\": \"test@example.com\","
                + "\"whatsappNumber\": \"9876543210\""
                + "}";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/workers/register/step1"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
    
    private static void testOtpVerification(long workerId, String otp) throws Exception {
        System.out.println("\n----- Testing OTP Verification -----");
        
        String requestBody = "{"
                + "\"workerId\": " + workerId + ","
                + "\"otp\": \"" + otp + "\""
                + "}";
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(BASE_URL + "/api/workers/verify-otp"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();
        
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
    
    private static void testRateLimiting() throws Exception {
        System.out.println("\n----- Testing Rate Limiting -----");
        System.out.println("Sending multiple requests to trigger rate limit...");
        
        for (int i = 0; i < 15; i++) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BASE_URL + "/api/free-otp/phone/in"))
                    .header("Accept", "application/json")
                    .GET()
                    .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            System.out.println("Request " + (i+1) + " - Status Code: " + response.statusCode());
            
            if (response.statusCode() == 429) {
                System.out.println("Rate limit triggered after " + (i+1) + " requests!");
                break;
            }
            
            // Small delay to avoid overwhelming the server
            Thread.sleep(300);
        }
    }
    
    private static void testSecurityFilter() throws Exception {
        System.out.println("\n----- Testing Security Filter -----");
        System.out.println("Sending multiple requests to the same endpoint...");
        
        for (int i = 0; i < 15; i++) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BASE_URL + "/api/free-otp/listen/in/919876543210"))
                    .header("Accept", "application/json")
                    .GET()
                    .build();
            
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            System.out.println("Request " + (i+1) + " - Status Code: " + response.statusCode());
            
            if (response.statusCode() == 429) {
                System.out.println("Security filter blocked request after " + (i+1) + " attempts!");
                break;
            }
            
            // Small delay to avoid overwhelming the server
            Thread.sleep(300);
        }
    }
}
