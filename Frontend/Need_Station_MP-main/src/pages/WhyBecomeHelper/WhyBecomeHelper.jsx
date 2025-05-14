import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WhyBecomeHelper.module.css';
import { ArrowRight, Handshake, Clock, Star, Users, User } from 'lucide-react';

const WhyBecomeHelper = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Why Become a Helper?</h1>
        
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Handshake size={24} />
            </div>
            <h3>Flexible Earnings</h3>
            <p>Earn extra income on your own schedule. Choose tasks that fit your availability.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Clock size={24} />
            </div>
            <h3>Flexible Hours</h3>
            <p>Work when it suits you. Choose tasks during your free hours.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Star size={24} />
            </div>
            <h3>Build Your Reputation</h3>
            <p>Get rated and reviewed by customers. Build a strong professional profile.</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Users size={24} />
            </div>
            <h3>Community Impact</h3>
            <p>Make a difference in your community. Help people in need.</p>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2>Ready to Get Started?</h2>
          <p>Join our community of dedicated helpers and start earning today!</p>
          <Link to="/helper-registration" className={styles.ctaButton}>
            Become a Helper <ArrowRight className={styles.arrowIcon} />
          </Link>
        </div>

        <div className={styles.testimonial}>
          <div className={styles.testimonialContent}>
            <p>"Joining NeedStation has been life-changing. I can now support my family while helping others."</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>
                <User size={24} />
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>Rahul Kumar</span>
                <span className={styles.authorRole}>Electrician Helper</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyBecomeHelper;
