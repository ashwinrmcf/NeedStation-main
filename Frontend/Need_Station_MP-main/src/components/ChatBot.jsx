import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiUser, FiMessageCircle, FiArrowRight } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import translationService from '../services/TranslationService';
// Using window.location instead of useNavigate for more reliability
import './ChatBot.css';

// Configure axios defaults
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

const ChatBot = () => {
  // No need for navigate hook anymore
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your NeedStation assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [changingLanguage, setChangingLanguage] = useState('');
  const messagesEndRef = useRef(null);
  
  // Function to change language directly
  const changeLanguage = async (langCode) => {
    setChangingLanguage(langCode);
    
    try {
      // Store language preference in localStorage
      localStorage.setItem('needstation-language', langCode);
      sessionStorage.setItem('needstation-auto-translate', 'true');
      
      // Set the HTML lang attribute for proper language styling
      document.documentElement.lang = langCode;
      
      // For Hindi, use the dedicated Hindi frontend (more reliable)
      if (langCode === 'hi') {
        // Add bot confirmation message before redirecting
        setMessages(prev => [...prev, { 
          text: "Switching to Hindi version of the site...", 
          sender: 'bot'
        }]);
        
        // Short delay before redirect
        setTimeout(() => {
          window.location.href = '/hi';
        }, 1500);
        return;
      }
      
      // For English, refresh to reset translations
      if (langCode === 'en') {
        // Add bot confirmation message before redirecting
        setMessages(prev => [...prev, { 
          text: "Switching to English. Refreshing page...", 
          sender: 'bot'
        }]);
        
        // Short delay before redirect
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
        return;
      }
      
      // For other languages, add confirmation message
      setMessages(prev => [...prev, { 
        text: `Switching to ${getLanguageName(langCode)}. Please wait...`, 
        sender: 'bot'
      }]);
      
      // Apply translations by refreshing the page
      // This is simpler than trying to apply translations in-place
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Language change error:', error);
      setChangingLanguage('');
      setMessages(prev => [...prev, { 
        text: "Sorry, I couldn't change the language. Please try the language settings page.", 
        sender: 'bot'
      }]);
    }
  };
  
  // Helper to get language name from code
  const getLanguageName = (code) => {
    const languages = {
      'en': 'English',
      'hi': 'Hindi',
      'ta': 'Tamil',
      'bn': 'Bengali',
      'ml': 'Malayalam',
      'te': 'Telugu',
      'kn': 'Kannada',
      'gu': 'Gujarati'
    };
    return languages[code] || code;
  };

  // Auto-scroll to the bottom of the chat
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Call Java backend AI service with explicit backend URL
      const backendUrl = 'http://localhost:8080/api/chatbot';
      console.log('Sending request to:', backendUrl);
      
      const response = await axios.post(backendUrl, { message: userMessage.text }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },

      });
      
      console.log('Received response:', response.data);
      
      // Extract data from the response
      const { message, redirectUrl, redirectButtonText } = response.data;
      
      // Check for language change requests in the redirectUrl and message
      if (redirectUrl && redirectButtonText) {
        // Check if this is a language change request
        if (redirectUrl === '/language-settings' && 
            (redirectButtonText.includes('Switch to') || redirectButtonText === 'View All Languages')) {
              
          // For specific language requests, extract language code
          if (redirectButtonText.startsWith('Switch to ')) {
            const langName = redirectButtonText.replace('Switch to ', '');
            let langCode = '';
            
            // Map language name to code
            if (langName === 'Hindi') langCode = 'hi';
            else if (langName === 'Tamil') langCode = 'ta';
            else if (langName === 'Bengali') langCode = 'bn';
            else if (langName === 'Malayalam') langCode = 'ml';
            else if (langName === 'Telugu') langCode = 'te';
            else if (langName === 'Kannada') langCode = 'kn';
            else if (langName === 'Gujarati') langCode = 'gu';
            else if (langName === 'English') langCode = 'en';
            
            if (langCode) {
              // Add bot response confirming language change
              setMessages(prev => [...prev, { 
                text: message, 
                sender: 'bot'
              }]);
              
              // Apply the language change directly
              changeLanguage(langCode);
              return; // Skip normal redirect handling
            }
          }
          
          // For general language settings, show all languages
          if (redirectButtonText === 'View All Languages') {
            // Add bot response to chat with general language options
            setMessages(prev => [...prev, { 
              text: message, 
              sender: 'bot',
              languageOptions: true // Flag to show language options
            }]);
            return; // Skip normal redirect handling
          }
        }
        
        // Handle normal redirects (non-language related)
        setMessages(prev => [...prev, { 
          text: message, 
          sender: 'bot',
          redirectUrl,
          redirectButtonText
        }]);
      } else {
        // Regular messages without redirect
        setMessages(prev => [...prev, { 
          text: message, 
          sender: 'bot'
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // More detailed error message for debugging
      // More detailed error message for debugging
      const errorMessage = error.response ? 
        `Error (${error.response.status}): ${error.response.data?.message || 'Unknown error'}` : 
        "Sorry, I'm having trouble connecting to the server. Please check if the backend is running.";
      
      setMessages(prev => [...prev, { 
        text: errorMessage, 
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
            <h3><span className="need-text">Need</span><span className="station-text">Bot</span></h3>
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
                  
                  {/* Show regular redirect button */}
                  {message.redirectUrl && message.redirectButtonText && (
                    <button 
                      className="redirect-button"
                      onClick={() => {
                        window.location.href = message.redirectUrl;
                        setIsOpen(false); // Close chat after navigation
                      }}
                    >
                      {message.redirectButtonText} <FiArrowRight />
                    </button>
                  )}
                  
                  {/* Show language options buttons when asked about languages */}
                  {message.languageOptions && (
                    <div className="language-options">
                      <button 
                        className="language-button"
                        onClick={() => changeLanguage('en')}
                        disabled={changingLanguage !== ''}
                      >
                        🇺🇸 English
                      </button>
                      <button 
                        className="language-button"
                        onClick={() => changeLanguage('hi')}
                        disabled={changingLanguage !== ''}
                      >
                        🇮🇳 Hindi
                      </button>
                      <button 
                        className="language-button"
                        onClick={() => changeLanguage('ta')}
                        disabled={changingLanguage !== ''}
                      >
                        🇮🇳 Tamil
                      </button>
                      <button 
                        className="language-button"
                        onClick={() => changeLanguage('bn')}
                        disabled={changingLanguage !== ''}
                      >
                        🇮🇳 Bengali
                      </button>
                      <div className="language-options-row">
                        <button 
                          className="language-button"
                          onClick={() => changeLanguage('ml')}
                          disabled={changingLanguage !== ''}
                        >
                          🇮🇳 Malayalam
                        </button>
                        <button 
                          className="language-button"
                          onClick={() => changeLanguage('te')}
                          disabled={changingLanguage !== ''}
                        >
                          🇮🇳 Telugu
                        </button>
                      </div>
                      <div className="language-options-row">
                        <button 
                          className="language-button"
                          onClick={() => changeLanguage('kn')}
                          disabled={changingLanguage !== ''}
                        >
                          🇮🇳 Kannada
                        </button>
                        <button 
                          className="language-button"
                          onClick={() => changeLanguage('gu')}
                          disabled={changingLanguage !== ''}
                        >
                          🇮🇳 Gujarati
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Show loading indicator when changing language */}
                  {message.sender === 'bot' && changingLanguage && (
                    <div className="language-changing">
                      <div className="spinner"></div>
                      <span>Changing language...</span>
                    </div>
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
              placeholder="Type your message..."
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

export default ChatBot;
