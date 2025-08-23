// NeedBot Configuration - Easily customize bot behavior and responses
export const NeedBotConfig = {
  // Bot personality and behavior
  personality: {
    name: "NeedBot",
    version: "2.0",
    tagline: "Smart • Fast • Cost-effective • Multilingual",
    responseDelay: 500, // milliseconds
    typingSpeed: 50, // characters per second for typing effect
  },

  // Enhanced navigation patterns with priority scoring
  navigationPatterns: {
    // High priority - exact service matches
    electrician: { 
      keywords: ['electrician', 'electrical', 'wiring', 'electricity', 'power', 'socket', 'switch', 'bulb', 'fan'], 
      route: '/electrician', 
      description: 'electrician services',
      priority: 10,
      category: 'service'
    },
    plumber: { 
      keywords: ['plumber', 'plumbing', 'water', 'pipe', 'leak', 'tap', 'faucet', 'toilet', 'drainage'], 
      route: '/plumber', 
      description: 'plumbing services',
      priority: 10,
      category: 'service'
    },
    maid: { 
      keywords: ['maid', 'cleaning', 'housekeeping', 'clean', 'sweep', 'mop', 'dust'], 
      route: '/maid-services', 
      description: 'maid services',
      priority: 10,
      category: 'service'
    },
    babysitter: { 
      keywords: ['babysitter', 'baby', 'child', 'kids', 'nanny', 'childcare'], 
      route: '/babysitter', 
      description: 'babysitting services',
      priority: 10,
      category: 'service'
    },
    caretaker: { 
      keywords: ['caretaker', 'care', 'elderly', 'senior', 'old age'], 
      route: '/caretaker', 
      description: 'caretaker services',
      priority: 10,
      category: 'service'
    },
    nurse: { 
      keywords: ['nurse', 'medical', 'health', 'healthcare', 'medicine'], 
      route: '/nurse', 
      description: 'nursing services',
      priority: 10,
      category: 'service'
    },
    
    // Medium priority - general pages
    home: { 
      keywords: ['home', 'main', 'start', 'beginning', 'dashboard'], 
      route: '/', 
      description: 'home page',
      priority: 8,
      category: 'navigation'
    },
    login: { 
      keywords: ['login', 'sign in', 'log in', 'account'], 
      route: '/login', 
      description: 'login page',
      priority: 7,
      category: 'auth'
    },
    signup: { 
      keywords: ['signup', 'register', 'sign up', 'create account', 'join'], 
      route: '/signup', 
      description: 'registration page',
      priority: 7,
      category: 'auth'
    },
    contact: { 
      keywords: ['contact', 'support', 'help', 'reach', 'customer service'], 
      route: '/contact-us', 
      description: 'contact us page',
      priority: 6,
      category: 'info'
    },
    about: { 
      keywords: ['about', 'info', 'information', 'company'], 
      route: '/about-us', 
      description: 'about us page',
      priority: 6,
      category: 'info'
    },
    helper: { 
      keywords: ['become helper', 'work', 'job', 'earn', 'income', 'employment'], 
      route: '/why-become-helper', 
      description: 'become a helper page',
      priority: 8,
      category: 'opportunity'
    },
    
    // Low priority - settings and misc
    language: { 
      keywords: ['language', 'translate', 'translation', 'hindi', 'tamil', 'bengali'], 
      route: '/language-settings', 
      description: 'language settings',
      priority: 5,
      category: 'settings'
    }
  },

  // Smart response patterns with context awareness
  responsePatterns: {
    greeting: {
      triggers: [/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)/i],
      responses: [
        "Hello! I'm NeedBot, your smart assistant.",
        "Hi there! Ready to help you with NeedStation services.",
        "Welcome! How can I assist you today?",
        "Greetings! What can I help you find?"
      ],
      followUp: "What service are you looking for today?"
    },
    
    farewell: {
      triggers: [/^(bye|goodbye|see you|thanks|thank you|that's all)/i],
      responses: [
        "Goodbye! Feel free to ask me anything anytime.",
        "Thank you for using NeedStation! Have a great day!",
        "See you later! I'm always here to help.",
        "Take care! Don't hesitate to reach out if you need assistance."
      ]
    },

    confusion: {
      triggers: [/^(what|huh|i don't understand|confused)/i],
      responses: [
        "I'm here to help! You can ask me to navigate to pages, find services, or change languages.",
        "Let me clarify! I can help you with navigation, service information, and language settings.",
        "No worries! Try asking me things like 'take me to electrician' or 'show me services'."
      ]
    },

    compliment: {
      triggers: [/^(good|great|awesome|nice|excellent|perfect|amazing)/i],
      responses: [
        "Thank you! I'm glad I could help.",
        "Happy to assist! Is there anything else you need?",
        "Glad to be of service! What else can I do for you?"
      ]
    }
  },

  // Enhanced language support with regional variations
  languageConfig: {
    supported: ['en', 'hi', 'ta', 'bn', 'ml', 'te', 'kn', 'gu'],
    regional: {
      'hi': ['hindi', 'हिंदी', 'हिन्दी'],
      'ta': ['tamil', 'தமிழ்', 'tamizh'],
      'bn': ['bengali', 'bangla', 'বাংলা'],
      'ml': ['malayalam', 'മലയാളം'],
      'te': ['telugu', 'తెలుగు'],
      'kn': ['kannada', 'ಕನ್ನಡ'],
      'gu': ['gujarati', 'ગુજરાતી']
    },
    autoDetect: true,
    fallbackToEnglish: true
  },

  // Advanced features
  features: {
    contextAwareness: true,
    learningMode: false, // Set to true to log user interactions for improvement
    voiceSupport: false, // Future feature
    quickActions: true,
    smartSuggestions: true,
    multiTurnConversation: true
  },

  // Quick action buttons for common tasks
  quickActions: [
    { label: "Find Services", action: "show_services", icon: "🔍" },
    { label: "Change Language", action: "language_menu", icon: "🌐" },
    { label: "Contact Support", action: "navigate", route: "/contact-us", icon: "💬" },
    { label: "Become Helper", action: "navigate", route: "/why-become-helper", icon: "💼" }
  ],

  // Smart suggestions based on context
  suggestions: {
    onStart: [
      "Find electrician services",
      "Browse all services", 
      "Change language",
      "Learn about NeedStation"
    ],
    afterService: [
      "Book this service",
      "See similar services",
      "Contact support",
      "Go back to services"
    ],
    onError: [
      "Try 'show me services'",
      "Say 'take me home'",
      "Ask for 'help'",
      "Change language"
    ]
  },

  // Analytics and improvement (privacy-friendly)
  analytics: {
    trackPopularQueries: true,
    trackNavigationPatterns: true,
    trackLanguagePreferences: true,
    anonymizeData: true
  }
};

export default NeedBotConfig;
