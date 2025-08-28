import React, { useState } from 'react';
import styles from "./HowItWorks.module.css";
import ScrollToTop from "../../hooks/ScrollToTop.jsx";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Browse Services",
      description: "Explore our comprehensive range of home services from cleaning to repairs, all in one platform.",
      icon: "🔍",
      details: "Browse through categories like cleaning, plumbing, electrical work, appliance repair, and more. Each service comes with detailed descriptions, pricing, and provider ratings."
    },
    {
      id: 2,
      title: "Select Provider",
      description: "Choose from verified professionals based on ratings, reviews, and availability.",
      icon: "👥",
      details: "View detailed profiles of service providers including their experience, certifications, customer reviews, and real-time availability. Compare prices and services easily."
    },
    {
      id: 3,
      title: "Book & Schedule",
      description: "Select your preferred date and time, then confirm your booking instantly.",
      icon: "📅",
      details: "Pick a convenient time slot that works for you. Our smart scheduling system ensures optimal timing for both you and the service provider."
    },
    {
      id: 4,
      title: "Service Delivery",
      description: "Enjoy professional service at your doorstep with real-time tracking and updates.",
      icon: "🏠",
      details: "Track your service provider's arrival in real-time. Receive updates throughout the service process and communicate directly through our platform."
    },
    {
      id: 5,
      title: "Payment & Review",
      description: "Secure payment processing and the opportunity to rate your experience.",
      icon: "⭐",
      details: "Pay securely through multiple payment options. Rate and review your experience to help other customers and improve our service quality."
    }
  ];

  const features = [
    {
      title: "Verified Professionals",
      description: "All service providers undergo thorough background checks and skill verification",
      icon: "✅"
    },
    {
      title: "Real-time Tracking",
      description: "Track your service provider's location and get live updates on service progress",
      icon: "📍"
    },
    {
      title: "Secure Payments",
      description: "Multiple payment options with bank-level security and fraud protection",
      icon: "🔒"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you with any queries or issues",
      icon: "🎧"
    },
    {
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with free re-service if you're not completely satisfied",
      icon: "🛡️"
    },
    {
      title: "Flexible Scheduling",
      description: "Book services at your convenience with same-day and emergency service options",
      icon: "⏰"
    }
  ];

  return (
    <div className={styles.howItWorksContainer}>
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            How <span className={styles.highlight}>NeedStation</span> Works
          </h1>
          <p className={styles.heroSubtitle}>
            Your trusted partner for all home services - simple, reliable, and professional
          </p>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Happy Customers</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Verified Professionals</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Service Categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Simple Steps to Get Started</h2>
          <div className={styles.stepsContainer}>
            <div className={styles.stepsTimeline}>
              {steps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`${styles.stepItem} ${activeStep === index ? styles.active : ''}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={styles.stepNumber}>
                    <span className={styles.stepIcon}>{step.icon}</span>
                    <span className={styles.stepCount}>{step.id}</span>
                  </div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.stepDetails}>
              <div className={styles.stepDetailCard}>
                <div className={styles.stepDetailIcon}>
                  {steps[activeStep].icon}
                </div>
                <h3 className={styles.stepDetailTitle}>
                  {steps[activeStep].title}
                </h3>
                <p className={styles.stepDetailDescription}>
                  {steps[activeStep].details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose NeedStation?</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Experience the Difference?</h2>
            <p className={styles.ctaDescription}>
              Join thousands of satisfied customers who trust NeedStation for their home service needs
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryBtn}>Book a Service</button>
              <button className={styles.secondaryBtn}>Become a Provider</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
