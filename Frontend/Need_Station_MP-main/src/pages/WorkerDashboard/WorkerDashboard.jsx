import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './WorkerDashboard.module.css';

const WorkerDashboard = () => {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcomeCard, setShowWelcomeCard] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkerData = async () => {
      const workerId = localStorage.getItem('workerId');
      
      if (!workerId) {
        setError('Worker ID not found. Please register first.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/worker/details/${workerId}`);
        setWorker(response.data);
        
        // Store that we've shown the welcome card to this worker
        const hasSeenWelcome = localStorage.getItem(`worker_${workerId}_welcomed`);
        if (hasSeenWelcome) {
          setShowWelcomeCard(false);
        } else {
          // Set after 10 seconds to auto-dismiss
          setTimeout(() => {
            setShowWelcomeCard(false);
            localStorage.setItem(`worker_${workerId}_welcomed`, 'true');
          }, 10000);
        }
      } catch (err) {
        console.error('Error fetching worker data:', err);
        setError('Failed to load your profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, []);

  const dismissWelcomeCard = () => {
    setShowWelcomeCard(false);
    const workerId = localStorage.getItem('workerId');
    if (workerId) {
      localStorage.setItem(`worker_${workerId}_welcomed`, 'true');
    }
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button 
          className={styles.returnButton}
          onClick={() => navigate('/worker-registration')}
        >
          Return to Registration
        </button>
      </div>
    );
  }

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

  return (
    <div className={styles.dashboardContainer}>
      {/* Welcome Card */}
      {showWelcomeCard && worker && (
        <div className={styles.welcomeCardOverlay}>
          <div className={styles.welcomeCard}>
            <div className={styles.welcomeHeader}>
              <h2>Welcome to NeedStation, {worker.fullName || 'Professional'}!</h2>
              <button 
                className={styles.closeButton} 
                onClick={dismissWelcomeCard}
              >
                ×
              </button>
            </div>
            
            <div className={styles.welcomeContent}>
              <div className={styles.welcomeIcon}>
                {worker.gender === 'Female' ? '👩‍🔧' : '👨‍🔧'}
              </div>
              
              <div className={styles.welcomeInfo}>
                <p className={styles.welcomeMessage}>
                  Your registration as a <span className={styles.highlight}>{worker.category || 'service professional'}</span> has been received.
                </p>
                
                <div className={styles.workerDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Experience Level:</span>
                    <span className={styles.detailValue}>{getExperienceLevel(worker.experience)}</span>
                  </div>
                  
                  {worker.serviceAreas && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Service Area:</span>
                      <span className={styles.detailValue}>{worker.serviceAreas}</span>
                    </div>
                  )}
                  
                  {worker.city && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>City:</span>
                      <span className={styles.detailValue}>{worker.city}</span>
                    </div>
                  )}
                  
                  {worker.workType && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Work Type:</span>
                      <span className={styles.detailValue}>{worker.workType}</span>
                    </div>
                  )}
                </div>
                
                <div className={styles.welcomeNote}>
                  <p>Your profile is now ready to receive service requests. Update your availability regularly to increase your chances of getting hired.</p>
                </div>
                
                <div className={styles.verificationStatus}>
                  <div className={worker.policeVerificationStatus === 'Verified' 
                    ? styles.verifiedBadge 
                    : styles.pendingBadge}
                  >
                    {worker.policeVerificationStatus === 'Verified' 
                      ? 'Verified ✓' 
                      : 'Verification Pending'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.welcomeActions}>
              <button className={styles.actionButton}>Update Profile</button>
              <button className={styles.actionButton}>View Jobs</button>
              <button 
                className={styles.dismissButton} 
                onClick={dismissWelcomeCard}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className={styles.dashboardHeader}>
        <h1>Worker Dashboard</h1>
        {worker && <span className={styles.welcomeText}>Hello, {worker.fullName}</span>}
      </div>

      {/* Dashboard content goes here */}
      <div className={styles.dashboardContent}>
        {worker ? (
          <>
            <div className={styles.dashboardCard}>
              <h3>Your Profile</h3>
              <div className={styles.profileSummary}>
                <div className={styles.profileImageContainer}>
                  {worker.profileImageUrl ? (
                    <img 
                      src={worker.profileImageUrl} 
                      alt={worker.fullName} 
                      className={styles.profileImage} 
                    />
                  ) : (
                    <div className={styles.profileInitials}>
                      {worker.fullName ? worker.fullName.charAt(0).toUpperCase() : 'W'}
                    </div>
                  )}
                </div>
                <div className={styles.profileDetails}>
                  <div className={styles.profileName}>{worker.fullName}</div>
                  <div className={styles.profileRole}>{worker.category || 'Service Professional'}</div>
                  <div className={styles.profileVerification}>
                    {worker.policeVerificationStatus === 'Verified' ? (
                      <span className={styles.verifiedTag}>Verified ✓</span>
                    ) : (
                      <span className={styles.pendingTag}>Verification Pending</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.quickStatsContainer}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📊</div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>0</div>
                  <div className={styles.statLabel}>Service Requests</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📆</div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>Available</div>
                  <div className={styles.statLabel}>Current Status</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>⭐</div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>New</div>
                  <div className={styles.statLabel}>Rating</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noProfileContainer}>
            <p>No profile data available. Please complete your registration.</p>
            <button 
              className={styles.registrationButton}
              onClick={() => navigate('/worker-registration')}
            >
              Go to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
