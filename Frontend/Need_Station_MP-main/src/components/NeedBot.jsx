import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser, FiMessageCircle, FiArrowRight, FiGlobe } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import smartTranslationService from '../services/SmartTranslationService';
import './ChatBot.css';

const NeedBot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: smartTranslationService.getPhrase('greeting'), 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem('needstation-language') || 'en'
  );
  const messagesEndRef = useRef(null);

  // Rule-based navigation patterns
  const navigationPatterns = {
    // Home and main pages
    home: { keywords: ['home', 'main', 'start', 'beginning'], route: '/', description: 'home page' },
    
    // Services
    electrician: { keywords: ['electrician', 'electrical', 'wiring', 'electricity', 'power'], route: '/electrician', description: 'electrician services' },
    plumber: { keywords: ['plumber', 'plumbing', 'water', 'pipe', 'leak', 'tap', 'faucet'], route: '/plumber', description: 'plumbing services' },
    maid: { keywords: ['maid', 'cleaning', 'housekeeping', 'clean'], route: '/maid-services', description: 'maid services' },
    babysitter: { keywords: ['babysitter', 'baby', 'child', 'kids', 'nanny'], route: '/babysitter', description: 'babysitting services' },
    caretaker: { keywords: ['caretaker', 'care', 'elderly', 'senior'], route: '/caretaker', description: 'caretaker services' },
    nurse: { keywords: ['nurse', 'medical', 'health', 'healthcare'], route: '/nurse', description: 'nursing services' },
    
    // Other pages
    login: { keywords: ['login', 'sign in', 'log in'], route: '/login', description: 'login page' },
    signup: { keywords: ['signup', 'register', 'sign up', 'create account'], route: '/signup', description: 'registration page' },
    contact: { keywords: ['contact', 'support', 'help', 'reach'], route: '/contact-us', description: 'contact us page' },
    about: { keywords: ['about', 'info', 'information'], route: '/about-us', description: 'about us page' },
    helper: { keywords: ['become helper', 'work', 'job', 'earn'], route: '/why-become-helper', description: 'become a helper page' },
    
    // Language settings
    language: { keywords: ['language', 'translate', 'translation', 'hindi', 'tamil', 'bengali'], route: '/language-settings', description: 'language settings' }
  };

  // Language mapping
  const languages = {
    'english': 'en',
    'hindi': 'hi', 
    'tamil': 'ta',
    'bengali': 'bn',
    'malayalam': 'ml',
    'telugu': 'te',
    'kannada': 'kn',
    'gujarati': 'gu'
  };

  // Predefined responses for common queries
  const responses = {
    greeting: [
      "Hello! I'm here to help you navigate NeedStation.",
      "Hi there! What can I help you find today?",
      "Welcome to NeedStation! How can I assist you?"
    ],
    services: "NeedStation offers various services including electrician, plumber, maid services, babysitting, caretaking, and nursing. Which service are you looking for?",
    help: "I can help you with:\n• Navigate to different pages\n• Change language settings\n• Find services\n• Get information about NeedStation\n\nJust tell me what you need!",
    default: "I understand you're looking for something. Could you be more specific? You can ask me to:\n• Take you to a specific page\n• Change the language\n• Find a service\n• Get help with navigation"
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Language change function
  const changeLanguage = async (langCode) => {
    try {
      localStorage.setItem('needstation-language', langCode);
      document.documentElement.lang = langCode;
      setCurrentLanguage(langCode);
      
      if (langCode === 'hi') {
        setMessages(prev => [...prev, { 
          text: "Switching to Hindi version...", 
          sender: 'bot'
        }]);
        setTimeout(() => {
          window.location.href = '/hi';
        }, 1500);
      } else if (langCode === 'en') {
        setMessages(prev => [...prev, { 
          text: "Switching to English...", 
          sender: 'bot'
        }]);
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setMessages(prev => [...prev, { 
          text: `Switching to ${getLanguageName(langCode)}. The page will refresh...`, 
          sender: 'bot'
        }]);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error('Language change error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't change the language. Please try again.", 
        sender: 'bot'
      }]);
    }
  };

  const getLanguageName = (code) => {
    const languageNames = {
      'en': 'English',
      'hi': 'Hindi',
      'ta': 'Tamil',
      'bn': 'Bengali',
      'ml': 'Malayalam',
      'te': 'Telugu',
      'kn': 'Kannada',
      'gu': 'Gujarati'
    };
    return languageNames[code] || code;
  };

  // Main processing function
  const processUserInput = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Check for greetings
    if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(input)) {
      return {
        type: 'response',
        message: responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
      };
    }

    // Check for help requests
    if (/help|what can you do|commands|options|मदद|உதவி|সাহায্য|സഹായം|సహాయం|ಸಹಾಯ|મદદ/.test(input)) {
      return {
        type: 'response',
        message: smartTranslationService.getPhrase('help_message')
      };
    }

    // Check for language change requests
    const languageMatch = input.match(/change language to (\w+)|switch to (\w+)|(\w+) language/);
    if (languageMatch) {
      const requestedLang = (languageMatch[1] || languageMatch[2] || languageMatch[3]).toLowerCase();
      const langCode = languages[requestedLang];
      
      if (langCode) {
        return {
          type: 'language_change',
          langCode: langCode,
          message: `Changing language to ${requestedLang.charAt(0).toUpperCase() + requestedLang.slice(1)}...`
        };
      }
    }

    // Check for navigation requests
    for (const [key, pattern] of Object.entries(navigationPatterns)) {
      const matchFound = pattern.keywords.some(keyword => {
        return input.includes(keyword) || 
               input.includes(`go to ${keyword}`) ||
               input.includes(`take me to ${keyword}`) ||
               input.includes(`show me ${keyword}`) ||
               input.includes(`find ${keyword}`) ||
               input.includes(`i need ${keyword}`) ||
               input.includes(`looking for ${keyword}`);
      });

      if (matchFound) {
        return {
          type: 'navigation',
          route: pattern.route,
          message: `I'll take you to the ${pattern.description}!`,
          buttonText: `Go to ${pattern.description}`
        };
      }
    }

    // Check for general service inquiry
    if (/service|services|what do you offer|available|सेवा|சேவை|সেবা|സേവന|సేవ|ಸೇವೆ|સેવા/.test(input)) {
      return {
        type: 'response',
        message: smartTranslationService.getPhrase('service_info')
      };
    }

    // Check for specific questions about NeedStation
    if (/what is needstation|about needstation|tell me about/.test(input)) {
      return {
        type: 'navigation',
        route: '/about-us',
        message: "NeedStation is a platform connecting you with reliable service providers. Let me show you more information!",
        buttonText: "Learn more about NeedStation"
      };
    }

    // Default response with suggestions
    return {
      type: 'response',
      message: responses.default
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Process the input using our rule-based system
      const result = processUserInput(input);
      
      // Add a small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (result.type === 'language_change') {
        setMessages(prev => [...prev, { 
          text: result.message, 
          sender: 'bot'
        }]);
        changeLanguage(result.langCode);
      } else if (result.type === 'navigation') {
        setMessages(prev => [...prev, { 
          text: result.message, 
          sender: 'bot',
          redirectUrl: result.route,
          redirectButtonText: result.buttonText
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: result.message, 
          sender: 'bot'
        }]);
      }
    } catch (error) {
      console.error('NeedBot processing error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Chat button */}
      <button
        className={`chat-button ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
      >
        {isOpen ? <IoClose size={24} /> : <FiMessageCircle size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>
              <span className="need-text">Need</span>
              <span className="station-text">Bot</span>
              <span className="bot-version"> v2.0</span>
            </h3>
            <small>
              <FiGlobe size={12} style={{marginRight: '4px'}} />
              Smart • Fast • Cost-effective • Multilingual
            </small>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-avatar">
                  {message.sender === 'user' ? <FiUser /> : '🤖'}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  
                  {/* Navigation button */}
                  {message.redirectUrl && message.redirectButtonText && (
                    <button 
                      className="redirect-button"
                      onClick={() => {
                        navigate(message.redirectUrl);
                        setIsOpen(false);
                      }}
                    >
                      {message.redirectButtonText} <FiArrowRight />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot-message">
                <div className="message-avatar">🤖</div>
                <div className="message-text typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={currentLanguage === 'en' 
                ? "Type your message... (e.g., 'take me to electrician' or 'change language to hindi')"
                : smartTranslationService.smartTranslate("Type your message...", currentLanguage)
              }
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              <FiSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NeedBot;
