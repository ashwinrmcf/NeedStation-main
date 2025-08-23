// Smart Translation Service - Cost-effective alternative to Google Translate API
// Uses rule-based translations for common phrases and integrates with existing system

class SmartTranslationService {
  constructor() {
    this.currentLang = localStorage.getItem('needstation-language') || 'en';
    this.translations = this.initializeTranslations();
    this.commonPhrases = this.initializeCommonPhrases();
  }

  // Initialize translation dictionaries for common NeedStation terms
  initializeTranslations() {
    return {
      // Navigation terms
      home: {
        hi: 'घर',
        ta: 'வீடு',
        bn: 'বাড়ি',
        ml: 'വീട്',
        te: 'ఇల్లు',
        kn: 'ಮನೆ',
        gu: 'ઘર'
      },
      services: {
        hi: 'सेवाएं',
        ta: 'சேவைகள்',
        bn: 'সেবা',
        ml: 'സേവനങ്ങൾ',
        te: 'సేవలు',
        kn: 'ಸೇವೆಗಳು',
        gu: 'સેવાઓ'
      },
      electrician: {
        hi: 'इलेक्ट्रीशियन',
        ta: 'மின்சாரம்',
        bn: 'ইলেকট্রিশিয়ান',
        ml: 'ഇലക്ട്രീഷ്യൻ',
        te: 'ఎలక్ట్రీషియన్',
        kn: 'ಎಲೆಕ್ಟ್ರೀಷಿಯನ್',
        gu: 'ઇલેક્ટ્રિશિયન'
      },
      plumber: {
        hi: 'प्लंबर',
        ta: 'குழாய்காரர்',
        bn: 'প্লাম্বার',
        ml: 'പ്ലമ്പർ',
        te: 'ప్లంబర్',
        kn: 'ಪ್ಲಂಬರ್',
        gu: 'પ્લમ્બર'
      },
      maid: {
        hi: 'सफाई कर्मचारी',
        ta: 'வீட்டு வேலைக்காரி',
        bn: 'গৃহকর্মী',
        ml: 'വീട്ടുജോലിക്കാരി',
        te: 'గృహ సేవకురాలు',
        kn: 'ಮನೆ ಕೆಲಸಗಾರ್ತಿ',
        gu: 'ઘરકામ કરનાર'
      },
      help: {
        hi: 'मदद',
        ta: 'உதவி',
        bn: 'সাহায্য',
        ml: 'സഹായം',
        te: 'సహాయం',
        kn: 'ಸಹಾಯ',
        gu: 'મદદ'
      },
      contact: {
        hi: 'संपर्क',
        ta: 'தொடர்பு',
        bn: 'যোগাযোগ',
        ml: 'ബന്ധപ്പെടുക',
        te: 'సంప్రదించు',
        kn: 'ಸಂಪರ್ಕ',
        gu: 'સંપર્ક'
      }
    };
  }

  // Initialize common phrases and responses
  initializeCommonPhrases() {
    return {
      greeting: {
        en: "Hello! I'm NeedBot, your smart assistant.",
        hi: "नमस्ते! मैं नीडबॉट हूं, आपका स्मार्ट सहायक।",
        ta: "வணக்கம்! நான் நீட்பாட், உங்கள் புத்திசாலி உதவியாளர்।",
        bn: "হ্যালো! আমি নিডবট, আপনার স্মার্ট সহায়ক।",
        ml: "ഹലോ! ഞാൻ നീഡ്ബോട്ട്, നിങ്ങളുടെ സ്മാർട്ട് അസിസ്റ്റന്റ്।",
        te: "హలో! నేను నీడ్‌బాట్, మీ స్మార్ట్ అసిస్టెంట్.",
        kn: "ಹಲೋ! ನಾನು ನೀಡ್‌ಬಾಟ್, ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್ ಸಹಾಯಕ.",
        gu: "હેલો! હું નીડબોટ છું, તમારો સ્માર્ટ સહાયક."
      },
      help_message: {
        en: "I can help you navigate, find services, and change languages. What do you need?",
        hi: "मैं आपको नेविगेट करने, सेवाएं खोजने और भाषा बदलने में मदद कर सकता हूं। आपको क्या चाहिए?",
        ta: "நான் உங்களுக்கு வழிகாட்ட, சேவைகளைக் கண்டறிய மற்றும் மொழிகளை மாற்ற உதவ முடியும். உங்களுக்கு என்ன வேண்டும்?",
        bn: "আমি আপনাকে নেভিগেট করতে, সেবা খুঁজতে এবং ভাষা পরিবর্তন করতে সাহায্য করতে পারি। আপনার কী প্রয়োজন?",
        ml: "എനിക്ക് നിങ്ങളെ നാവിഗേറ്റ് ചെയ്യാനും സേവനങ്ങൾ കണ്ടെത്താനും ഭാഷകൾ മാറ്റാനും സഹായിക്കാം. നിങ്ങൾക്ക് എന്താണ് വേണ്ടത്?",
        te: "నేను మీకు నావిగేట్ చేయడంలో, సేవలను కనుగొనడంలో మరియు భాషలను మార్చడంలో సహాయపడగలను. మీకు ఏమి కావాలి?",
        kn: "ನಾನು ನಿಮಗೆ ನ್ಯಾವಿಗೇಟ್ ಮಾಡಲು, ಸೇವೆಗಳನ್ನು ಹುಡುಕಲು ಮತ್ತು ಭಾಷೆಗಳನ್ನು ಬದಲಾಯಿಸಲು ಸಹಾಯ ಮಾಡಬಹುದು. ನಿಮಗೆ ಏನು ಬೇಕು?",
        gu: "હું તમને નેવિગેટ કરવામાં, સેવાઓ શોધવામાં અને ભાષાઓ બદલવામાં મદદ કરી શકું છું. તમને શું જોઈએ છે?"
      },
      service_info: {
        en: "NeedStation offers electrician, plumber, maid, babysitting, caretaking, and nursing services. Which service interests you?",
        hi: "नीडस्टेशन इलेक्ट्रीशियन, प्लंबर, सफाई, बेबीसिटिंग, देखभाल और नर्सिंग सेवाएं प्रदान करता है। कौन सी सेवा में आपकी रुचि है?",
        ta: "நீட்ஸ்டேஷன் மின்சாரம், குழாய், வீட்டு வேலை, குழந்தை பராமரிப்பு, முதியோர் பராமரிப்பு மற்றும் நர்சிங் சேவைகளை வழங்குகிறது. எந்த சேவையில் ஆர்வம் உள்ளது?",
        bn: "নিডস্টেশন ইলেকট্রিশিয়ান, প্লাম্বার, গৃহকর্মী, শিশু দেখাশোনা, যত্ন এবং নার্সিং সেবা প্রদান করে। কোন সেবায় আপনার আগ্রহ?",
        ml: "നീഡ്‌സ്റ്റേഷൻ ഇലക്ട്രീഷ്യൻ, പ്ലമ്പർ, വീട്ടുജോലി, കുഞ്ഞ് പരിചരണം, പരിചരണം, നഴ്‌സിംഗ് സേവനങ്ങൾ നൽകുന്നു. ഏത് സേവനത്തിൽ താൽപ്പര്യമുണ്ട്?",
        te: "నీడ్‌స్టేషన్ ఎలక్ట్రీషియన్, ప్లంబర్, గృహ సేవ, పిల్లల సంరక్షణ, సంరక్షణ మరియు నర్సింగ్ సేవలను అందిస్తుంది. ఏ సేవలో ఆసక్తి ఉంది?",
        kn: "ನೀಡ್‌ಸ್ಟೇಷನ್ ಎಲೆಕ್ಟ್ರೀಷಿಯನ್, ಪ್ಲಂಬರ್, ಮನೆ ಕೆಲಸ, ಮಗು ನೋಡಿಕೊಳ್ಳುವುದು, ಆರೈಕೆ ಮತ್ತು ನರ್ಸಿಂಗ್ ಸೇವೆಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಯಾವ ಸೇವೆಯಲ್ಲಿ ಆಸಕ್ತಿ?",
        gu: "નીડસ્ટેશન ઇલેક્ટ્રિશિયન, પ્લમ્બર, ઘરકામ, બાળ સંભાળ, સંભાળ અને નર્સિંગ સેવાઓ પ્રદાન કરે છે. કઈ સેવામાં રસ છે?"
      }
    };
  }

  // Translate a single word or phrase
  translateTerm(term, targetLang = this.currentLang) {
    if (targetLang === 'en') return term;
    
    const translation = this.translations[term.toLowerCase()];
    return translation && translation[targetLang] ? translation[targetLang] : term;
  }

  // Get a common phrase in the target language
  getPhrase(phraseKey, targetLang = this.currentLang) {
    const phrase = this.commonPhrases[phraseKey];
    return phrase && phrase[targetLang] ? phrase[targetLang] : phrase?.en || phraseKey;
  }

  // Detect language from user input
  detectLanguage(text) {
    const hindiPattern = /[\u0900-\u097F]/;
    const tamilPattern = /[\u0B80-\u0BFF]/;
    const bengaliPattern = /[\u0980-\u09FF]/;
    const malayalamPattern = /[\u0D00-\u0D7F]/;
    const teluguPattern = /[\u0C00-\u0C7F]/;
    const kannadaPattern = /[\u0C80-\u0CFF]/;
    const gujaratiPattern = /[\u0A80-\u0AFF]/;

    if (hindiPattern.test(text)) return 'hi';
    if (tamilPattern.test(text)) return 'ta';
    if (bengaliPattern.test(text)) return 'bn';
    if (malayalamPattern.test(text)) return 'ml';
    if (teluguPattern.test(text)) return 'te';
    if (kannadaPattern.test(text)) return 'kn';
    if (gujaratiPattern.test(text)) return 'gu';
    
    return 'en'; // Default to English
  }

  // Smart translate function that uses rules first, then falls back to existing system
  async smartTranslate(text, targetLang = this.currentLang) {
    if (targetLang === 'en') return text;

    // First, try to find exact matches in our phrase dictionary
    for (const [key, phrases] of Object.entries(this.commonPhrases)) {
      if (text.toLowerCase().includes(key) || phrases.en.toLowerCase() === text.toLowerCase()) {
        return phrases[targetLang] || text;
      }
    }

    // Try word-by-word translation for known terms
    const words = text.split(' ');
    const translatedWords = words.map(word => this.translateTerm(word, targetLang));
    
    // If we found translations for some words, return the mixed result
    if (translatedWords.some((word, index) => word !== words[index])) {
      return translatedWords.join(' ');
    }

    // If no rule-based translation found, return original text
    // In a production environment, you could integrate with a free translation API here
    return text;
  }

  // Update current language
  setLanguage(langCode) {
    this.currentLang = langCode;
    localStorage.setItem('needstation-language', langCode);
  }

  // Get language name in the current language
  getLanguageName(langCode) {
    const names = {
      en: { en: 'English', hi: 'अंग्रेजी', ta: 'ஆங்கிலம்', bn: 'ইংরেজি', ml: 'ഇംഗ്ലീഷ്', te: 'ఆంగ్లం', kn: 'ಇಂಗ್ಲಿಷ್', gu: 'અંગ્રેજી' },
      hi: { en: 'Hindi', hi: 'हिंदी', ta: 'இந்தி', bn: 'হিন্দি', ml: 'ഹിന്ദി', te: 'హిందీ', kn: 'ಹಿಂದಿ', gu: 'હિન્દી' },
      ta: { en: 'Tamil', hi: 'तमिल', ta: 'தமிழ்', bn: 'তামিল', ml: 'തമിഴ്', te: 'తమిళ్', kn: 'ತಮಿಳ್', gu: 'તમિલ' },
      bn: { en: 'Bengali', hi: 'बंगाली', ta: 'வங்காளி', bn: 'বাংলা', ml: 'ബംഗാളി', te: 'బెంగాలీ', kn: 'ಬಂಗಾಳಿ', gu: 'બંગાળી' },
      ml: { en: 'Malayalam', hi: 'मलयालम', ta: 'மலையாளம்', bn: 'মালয়ালম', ml: 'മലയാളം', te: 'మలయాళం', kn: 'ಮಲಯಾಳಂ', gu: 'મલયાલમ' },
      te: { en: 'Telugu', hi: 'तेलुगु', ta: 'தெலுங்கு', bn: 'তেলুগু', ml: 'തെലുങ്ക്', te: 'తెలుగు', kn: 'ತೆಲುಗು', gu: 'તેલુગુ' },
      kn: { en: 'Kannada', hi: 'कन्नड़', ta: 'கன்னடம்', bn: 'কন্নড়', ml: 'കന്നഡ', te: 'కన్నడ', kn: 'ಕನ್ನಡ', gu: 'કન્નડ' },
      gu: { en: 'Gujarati', hi: 'गुजराती', ta: 'குஜராத்தி', bn: 'গুজরাটি', ml: 'ഗുജറാത്തി', te: 'గుజరాతీ', kn: 'ಗುಜರಾತಿ', gu: 'ગુજરાતી' }
    };
    
    return names[langCode] && names[langCode][this.currentLang] 
      ? names[langCode][this.currentLang] 
      : langCode.toUpperCase();
  }
}

// Create and export a singleton instance
const smartTranslationService = new SmartTranslationService();
export default smartTranslationService;
