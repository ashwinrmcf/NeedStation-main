import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FiSend, FiUser, FiMessageCircle } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import './ChatBot.css';

// Configure axios defaults
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your NeedStation assistant. How can I help you today?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
        }
      });
      
      console.log('Received response:', response.data);
      
      // Add bot response to chat
      setMessages(prev => [...prev, { 
        text: response.data.response, 
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
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
            <h3>NeedStation Assistant</h3>
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
                <div className="message-text">{message.text}</div>
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
