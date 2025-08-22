/**
 * Utility functions to help with translations without changing component structure
 */

// Google Translate API key
const API_KEY = "AIzaSyDaEJ4vo3cRDG90bsEVw2C98QNQlP5Ai6o";

/**
 * Clean language prefix tags before translation
 * @param {string} text - Text to clean
 * @returns {string} Text without language prefix tags
 */
export const cleanLanguagePrefixes = (text) => {
  if (!text) return text;
  return text.replace(/\[[\w]{2}\]/g, '').trim();
};

/**
 * Translates text using Google Translate API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} Translated text
 */
export const translateText = async (text, targetLang) => {
  try {
    // Clean text before translation
    const cleanedText = cleanLanguagePrefixes(text);
    
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: cleanedText,
        target: targetLang,
      }),
    });
    
    const data = await response.json();
    if (data.data && data.data.translations && data.data.translations[0]) {
      return data.data.translations[0].translatedText;
    } else {
      throw new Error('Invalid translation response');
    }
  } catch (error) {
    console.error('Translation API error:', error);
    return text; // Return original text on error
  }
};

/**
 * Apply translations to a component without changing its structure
 * @param {Object} componentData - Original data used in the component
 * @param {string} targetLang - Target language code
 * @returns {Promise<Object>} Translated component data
 */
export const translateComponentData = async (componentData, targetLang) => {
  if (!componentData || targetLang === 'en') {
    return componentData;
  }
  
  const translatedData = { ...componentData };
  
  // Recursively translate all string properties
  const translateObject = async (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = await translateText(obj[key], targetLang);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        await translateObject(obj[key]);
      } else if (Array.isArray(obj[key])) {
        for (let i = 0; i < obj[key].length; i++) {
          if (typeof obj[key][i] === 'string') {
            obj[key][i] = await translateText(obj[key][i], targetLang);
          } else if (typeof obj[key][i] === 'object' && obj[key][i] !== null) {
            await translateObject(obj[key][i]);
          }
        }
      }
    }
  };
  
  await translateObject(translatedData);
  return translatedData;
};

/**
 * Get current language from localStorage
 * @returns {string} Current language code
 */
export const getCurrentLanguage = () => {
  return localStorage.getItem('needstation-language') || 'en';
};

/**
 * Set the language in localStorage and HTML
 * @param {string} langCode - Language code to set
 */
export const setLanguage = (langCode) => {
  localStorage.setItem('needstation-language', langCode);
  document.documentElement.lang = langCode;
  
  // Load appropriate font
  if (langCode === 'hi') {
    loadHindiFont();
  } else {
    // Remove any language-specific fonts
    document.querySelectorAll('link[data-lang-font]').forEach(link => link.remove());
  }
};

/**
 * Load Hindi font
 */
const loadHindiFont = () => {
  // Remove any existing language font links
  document.querySelectorAll('link[data-lang-font]').forEach(link => link.remove());
  
  // Add Hindi font
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;700&display=swap';
  fontLink.setAttribute('data-lang-font', 'hi');
  document.head.appendChild(fontLink);
};
