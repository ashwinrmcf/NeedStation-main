import React, { useState } from 'react';
import styles from "./FAQ.module.css";
import ScrollToTop from "../../hooks/ScrollToTop.jsx";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: '❓' },
    { id: 'booking', name: 'Booking', icon: '📅' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'providers', name: 'Service Providers', icon: '👥' },
    { id: 'support', name: 'Support', icon: '🎧' }
  ];

  const faqData = {
    general: [
      {
        question: "What is NeedStation?",
        answer: "NeedStation is a comprehensive home services platform that connects customers with verified professionals for various household needs including cleaning, repairs, maintenance, and more. We ensure quality service delivery through our rigorous vetting process and customer satisfaction guarantee."
      },
      {
        question: "How does NeedStation ensure service quality?",
        answer: "We maintain high service standards through multiple measures: thorough background checks of all service providers, skill verification tests, customer rating systems, regular quality audits, and a 100% satisfaction guarantee with free re-service if needed."
      },
      {
        question: "What areas do you serve?",
        answer: "NeedStation currently operates in major metropolitan areas and is rapidly expanding. Check our service area map on the homepage or contact us to see if we serve your location. We're constantly adding new cities to our network."
      },
      {
        question: "Are your service providers insured?",
        answer: "Yes, all our service providers carry comprehensive insurance coverage including liability and worker's compensation. This protects both you and the service provider during the service delivery."
      }
    ],
    booking: [
      {
        question: "How do I book a service?",
        answer: "Booking is simple: Browse our services, select your preferred provider based on ratings and availability, choose your preferred date and time, provide service details, and confirm your booking. You'll receive instant confirmation with provider details."
      },
      {
        question: "Can I reschedule or cancel my booking?",
        answer: "Yes, you can reschedule or cancel your booking up to 4 hours before the scheduled time without any charges. For cancellations within 4 hours, a small cancellation fee may apply. Use our app or website to manage your bookings."
      },
      {
        question: "What if no providers are available for my preferred time?",
        answer: "Our system will suggest alternative time slots with available providers. You can also join our waitlist for your preferred time, and we'll notify you if a slot opens up. For urgent needs, we offer emergency services with premium pricing."
      },
      {
        question: "How far in advance can I book a service?",
        answer: "You can book services up to 30 days in advance. For same-day bookings, services are available based on provider availability. We recommend booking at least 24 hours in advance for the best selection of providers and time slots."
      }
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, digital wallets (PayPal, Apple Pay, Google Pay), and bank transfers. All payments are processed securely with bank-level encryption."
      },
      {
        question: "When am I charged for the service?",
        answer: "Payment is processed after the service is completed and you've confirmed satisfaction. For some premium services, a small booking fee may be charged upfront, which is adjusted against the final bill."
      },
      {
        question: "Can I get a refund if I'm not satisfied?",
        answer: "Absolutely! We offer a 100% satisfaction guarantee. If you're not completely satisfied with the service, we'll either arrange a free re-service or provide a full refund. Contact our support team within 24 hours of service completion."
      },
      {
        question: "Are there any hidden charges?",
        answer: "No, we believe in transparent pricing. All costs including service charges, taxes, and any applicable fees are clearly displayed before you confirm your booking. The price you see is the price you pay."
      }
    ],
    providers: [
      {
        question: "How do you select service providers?",
        answer: "Our rigorous selection process includes background verification, skill assessment tests, reference checks, insurance verification, and a probationary period with supervised services. Only the top 10% of applicants make it through our screening process."
      },
      {
        question: "Can I request the same provider for future services?",
        answer: "Yes! If you're satisfied with a provider's service, you can add them to your favorites and request them for future bookings. We'll prioritize matching you with your preferred providers based on their availability."
      },
      {
        question: "What if I have issues with a service provider?",
        answer: "Contact our support team immediately. We take all complaints seriously and will investigate promptly. Depending on the issue, we may arrange a replacement provider, offer a re-service, or provide a refund. Provider ratings and feedback help us maintain quality standards."
      },
      {
        question: "How are providers rated and reviewed?",
        answer: "After each service, customers can rate providers on a 5-star scale and leave detailed reviews. These ratings consider factors like punctuality, quality of work, professionalism, and overall satisfaction. All reviews are verified and help other customers make informed choices."
      }
    ],
    support: [
      {
        question: "How can I contact customer support?",
        answer: "Our customer support is available 24/7 through multiple channels: in-app chat, phone support, email, and our website contact form. For urgent issues during service delivery, use our emergency hotline for immediate assistance."
      },
      {
        question: "What if there's an emergency during service?",
        answer: "For any emergency during service delivery, immediately contact our 24/7 emergency hotline. We have protocols in place for various emergency situations and will coordinate with local authorities if necessary. Your safety is our top priority."
      },
      {
        question: "How do I track my service request?",
        answer: "You can track your service in real-time through our app or website. You'll receive updates when the provider is assigned, when they're on their way, and throughout the service process. GPS tracking shows the provider's location for on-site services."
      },
      {
        question: "Can I provide feedback about the platform?",
        answer: "We welcome your feedback! You can share suggestions, report issues, or provide general feedback through our app, website, or by contacting customer support. Your input helps us continuously improve our platform and services."
      }
    ]
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className={styles.faqContainer}>
      <ScrollToTop />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Frequently Asked <span className={styles.highlight}>Questions</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Find answers to common questions about NeedStation services, booking, and support
          </p>
          <div className={styles.searchBox}>
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className={styles.searchInput}
            />
            <button className={styles.searchBtn}>🔍</button>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqLayout}>
            {/* Category Sidebar */}
            <div className={styles.categorySidebar}>
              <h3 className={styles.sidebarTitle}>Categories</h3>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.active : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <span className={styles.categoryName}>{category.name}</span>
                </button>
              ))}
            </div>

            {/* FAQ Content */}
            <div className={styles.faqContent}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.categoryTitle}>
                  {categories.find(cat => cat.id === activeCategory)?.icon} {' '}
                  {categories.find(cat => cat.id === activeCategory)?.name} Questions
                </h2>
                <p className={styles.categoryDescription}>
                  {faqData[activeCategory].length} questions in this category
                </p>
              </div>

              <div className={styles.faqList}>
                {faqData[activeCategory].map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <button
                      className={`${styles.faqQuestion} ${openFAQ === index ? styles.open : ''}`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span className={styles.questionText}>{faq.question}</span>
                      <span className={styles.toggleIcon}>
                        {openFAQ === index ? '−' : '+'}
                      </span>
                    </button>
                    <div className={`${styles.faqAnswer} ${openFAQ === index ? styles.open : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className={styles.supportSection}>
        <div className={styles.container}>
          <div className={styles.supportContent}>
            <h2 className={styles.supportTitle}>Still Have Questions?</h2>
            <p className={styles.supportDescription}>
              Can't find what you're looking for? Our support team is here to help 24/7
            </p>
            <div className={styles.supportOptions}>
              <div className={styles.supportOption}>
                <div className={styles.supportIcon}>💬</div>
                <h3>Live Chat</h3>
                <p>Get instant help from our support team</p>
                <button className={styles.supportBtn}>Start Chat</button>
              </div>
              <div className={styles.supportOption}>
                <div className={styles.supportIcon}>📞</div>
                <h3>Phone Support</h3>
                <p>Call us for immediate assistance</p>
                <button className={styles.supportBtn}>Call Now</button>
              </div>
              <div className={styles.supportOption}>
                <div className={styles.supportIcon}>✉️</div>
                <h3>Email Support</h3>
                <p>Send us your questions via email</p>
                <button className={styles.supportBtn}>Send Email</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
