import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { EyeOff, UserCheck, Clock, Edit, Briefcase } from 'lucide-react';
import './WelcomeCard.css';

const WelcomeCard = ({ isVisible, onVisibilityChange }) => {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkerData = async () => {
      setLoading(true);
      const workerId = localStorage.getItem('workerId');
      
      if (!workerId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/worker/details/${workerId}`);
        setWorker(response.data);
      } catch (err) {
        console.error('Error fetching worker data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, []);

  const dismissWelcomeCard = () => {
    // Hide the welcome card
    onVisibilityChange(false);
    
    const workerId = localStorage.getItem('workerId');
    if (workerId) {
      localStorage.setItem(`worker_${workerId}_welcomed`, 'true');
    }
  };

  // Calculate experience level based on years
  const getExperienceLevel = (years) => {
    if (!years) return 'New';
    const experienceYears = parseInt(years);
    if (isNaN(experienceYears)) return 'New';
    if (experienceYears < 2) return 'Entry Level';
    if (experienceYears < 5) return 'Intermediate';
    if (experienceYears < 10) return 'Experienced';
    return 'Expert';
  };

  if (!isVisible) {
    return null;
  }
  
  if (loading) {
    return (
      <motion.div 
        className="welcome-card loading-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="loading-content">
          <div className="spinner" />
        </div>
      </motion.div>
    );
  }

  if (!worker) {
    return null;
  }

  const handleUpdateProfile = () => {
    navigate('/helper/settings');
  };

  const handleViewJobs = () => {
    navigate('/helper/upcoming-tasks');
  };

  return (
    <motion.div 
      className="welcome-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hide button at top-right corner */}
      <button 
        onClick={dismissWelcomeCard}
        className="hide-button"
        title="Hide welcome card"
      >
        <EyeOff size={20} />
      </button>
      <div className="welcome-card-header">
        <h2 className="welcome-title">Welcome to NeedStation, {worker.fullName || 'Professional'}!</h2>
      </div>
      
      <div className="welcome-card-content">
        <div className="welcome-icon">
          {worker.gender === 'Female' ? '👩‍🔧' : '👨‍🔧'}
        </div>
        
        <div className="welcome-info">
          <p className="welcome-message">
            Your registration as a <span className="highlight">{worker.category || 'service professional'}</span> has been received.
          </p>
          
          <div className="worker-details">
            <div className="detail-item">
              <span className="detail-label">Experience Level:</span>
              <span className="detail-value">{getExperienceLevel(worker.experience)}</span>
            </div>
            
            {worker.serviceAreas && (
              <div className="detail-item">
                <span className="detail-label">Service Area:</span>
                <span className="detail-value">{worker.serviceAreas}</span>
              </div>
            )}
            
            {worker.city && (
              <div className="detail-item">
                <span className="detail-label">City:</span>
                <span className="detail-value">{worker.city}</span>
              </div>
            )}
            
            {worker.workType && (
              <div className="detail-item">
                <span className="detail-label">Work Type:</span>
                <span className="detail-value">{worker.workType}</span>
              </div>
            )}
          </div>
          
          <div className="welcome-note">
            <p>Your profile is now ready to receive service requests. Update your availability regularly to increase your chances of getting hired.</p>
          </div>
          
          <div className="verification-status">
            <div className={worker.policeVerificationStatus === 'Verified' 
              ? 'verified-badge' 
              : 'pending-badge'}
            >
              {worker.policeVerificationStatus === 'Verified' 
                ? <>
                    <UserCheck size={14} className="badge-icon" />
                    <span>Verified</span>
                  </>
                : <>
                    <Clock size={14} className="badge-icon" />
                    <span>Verification Pending</span>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
      
      <div className="welcome-actions">
        <button className="action-button" onClick={handleUpdateProfile}>
          <Edit size={16} />
          <span>Update Profile</span>
        </button>
        <button className="action-button" onClick={handleViewJobs}>
          <Briefcase size={16} />
          <span>View Jobs</span>
        </button>
        <button 
          className="dismiss-button" 
          onClick={dismissWelcomeCard}
        >
          Dismiss
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
