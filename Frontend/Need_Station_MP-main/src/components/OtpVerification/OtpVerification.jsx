import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Box, CircularProgress, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import styles from './OtpVerification.module.css';

const OtpVerification = ({ workerId, onVerificationSuccess, onCancel }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, failed
  const [attemptsLeft, setAttemptsLeft] = useState(5);

  // Check verification status on component mount
  useEffect(() => {
    checkVerificationStatus();
  }, []);

  // Timer for resend OTP button
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Check if the worker's phone is already verified
  const checkVerificationStatus = async () => {
    try {
      const response = await axios.get(`/api/worker/otp/status/${workerId}`);
      if (response.data.success) {
        setPhoneNumber(response.data.phoneNumber);
        
        if (response.data.verified) {
          setVerificationStatus('success');
          onVerificationSuccess && onVerificationSuccess();
        }
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };

  // Handle OTP input change
  const handleOtpChange = (e) => {
    // Only allow numbers and limit to 6 digits
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
    setOtp(value);
  };

  // Send OTP verification request
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`/api/worker/otp/verify/${workerId}`, { otp });
      
      if (response.data.success) {
        setVerificationStatus('success');
        toast.success('Phone number verified successfully!');
        onVerificationSuccess && onVerificationSuccess();
      } else {
        setVerificationStatus('failed');
        if (response.data.attemptsLeft !== undefined) {
          setAttemptsLeft(response.data.attemptsLeft);
        }
        toast.error(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setVerificationStatus('failed');
      
      const errorMessage = error.response?.data?.message || 'Failed to verify OTP. Please try again.';
      if (error.response?.data?.attemptsLeft !== undefined) {
        setAttemptsLeft(error.response.data.attemptsLeft);
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(`/api/worker/otp/generate/${workerId}`);
      
      if (response.data.success) {
        setTimer(120); // 2 minutes cooldown
        setVerificationStatus('pending');
        toast.success('A new verification code has been sent to your phone');
      } else {
        toast.error(response.data.message || 'Failed to send verification code');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to send verification code. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  // If already verified, show success
  if (verificationStatus === 'success') {
    return (
      <Paper elevation={3} className={styles.verificationCard}>
        <Box className={styles.successContainer}>
          <div className={styles.successIcon}>✓</div>
          <Typography variant="h5" component="h2" gutterBottom>
            Phone Verified
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Your phone number has been successfully verified.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={onVerificationSuccess}
            className={styles.continueButton}
          >
            Continue
          </Button>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} className={styles.verificationCard}>
      <Typography variant="h5" component="h2" gutterBottom>
        Phone Verification
      </Typography>
      
      <Typography variant="body1" color="textSecondary" gutterBottom>
        A verification code has been sent to {phoneNumber}
      </Typography>
      
      <TextField
        label="Enter 6-digit OTP"
        variant="outlined"
        fullWidth
        value={otp}
        onChange={handleOtpChange}
        margin="normal"
        inputProps={{ maxLength: 6 }}
        error={verificationStatus === 'failed'}
        helperText={verificationStatus === 'failed' ? `Invalid OTP. ${attemptsLeft} attempts left.` : ''}
      />
      
      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleVerifyOtp}
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
        </Button>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Button
            variant="text"
            color="primary"
            disabled={timer > 0 || isResending}
            onClick={handleResendOtp}
          >
            {isResending ? (
              <CircularProgress size={16} color="inherit" />
            ) : timer > 0 ? (
              `Resend in ${formatTime(timer)}`
            ) : (
              'Resend OTP'
            )}
          </Button>
          
          {onCancel && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default OtpVerification;
