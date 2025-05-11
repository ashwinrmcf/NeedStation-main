import axios from 'axios';

// Create a safe reference to window
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : {};

// Global translation cache
if (isBrowser) {
  safeWindow.translationCache = safeWindow.translationCache || {};
}

// List of common text elements that appear throughout the site
const commonTexts = [
  "Home", "About Us", "Contact Us", "Services", "Login", "Sign up",
  "Become a Tasker", "Submit", "Cancel", "Next", "Previous",
  "Basic Needs", "Maid Services", "Elder Care"
];

/**
 * Translation Service for NeedStation
 */
class TranslationService {
  constructor() {
    this.translating = false;
    
    // Safely access localStorage
    try {
      this.currentLang = isBrowser && localStorage.getItem('needstation-language') || 'en';
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      this.currentLang = 'en';
    }
  }

  /**
   * Preload translations for common text to improve speed
   */
  async preloadTranslations() {
    if (this.currentLang === 'en' || !isBrowser) return; // Skip for English or non-browser

    // Create a cache for translations if not exists
    safeWindow.translationCache = safeWindow.translationCache || {};
    
    // Only preload if not already in cache
    if (!safeWindow.translationCache[this.currentLang]) {
      safeWindow.translationCache[this.currentLang] = {};
      
      try {
        console.log('Making translation API request to backend');
        const response = await axios.post("http://localhost:8080/api/translate/batch", {
          texts: commonTexts,
          lang: this.currentLang,
        });
        
        if (response.data && response.data.translations) {
          commonTexts.forEach((text, idx) => {
            if (idx < response.data.translations.length) {
              safeWindow.translationCache[this.currentLang][text] = response.data.translations[idx];
            }
          });
        }
      } catch (error) {
        console.error(`Failed to preload translations for ${this.currentLang}:`, error);
      }
    }
  }

  /**
   * Protect logo and other elements from translation
   */
  protectElements() {
    // Find and protect logo elements
    const logoElements = document.querySelectorAll('[class*="logo"]');
    logoElements.forEach(elem => {
      elem.setAttribute('data-no-translate', 'true');
      
      // Protect children of logo elements
      Array.from(elem.children).forEach(child => {
        child.setAttribute('data-no-translate', 'true');
      });
    });

    // Explicitly protect elements with text "NeedStation", "Need", or "Station"
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.textContent && 
          (el.textContent.includes('NeedStation') || 
           el.textContent === 'Need' || 
           el.textContent === 'Station')) {
        el.setAttribute('data-no-translate', 'true');
      }
    });
  }

  /**
   * Apply translation to the current page
   */
  async translatePage() {
    console.log('Translation attempted with language:', this.currentLang);
    
    // Skip if we're already translating or if it's English
    if (this.translating) {
      console.log('Translation skipped: Already translating');
      return;
    }
    
    if (this.currentLang === 'en') {
      console.log('Translation skipped: Language is English');
      return;
    }
    
    if (!isBrowser) {
      console.log('Translation skipped: Not in browser environment');
      return;
    }
    
    console.log('Starting translation process for language:', this.currentLang);
    const startTime = isBrowser ? performance.now() : 0;
    this.translating = true;
    
    // Protect logo and other elements first
    this.protectElements();
    
    // Create tree walker to find text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip nodes that are part of the logo (NeedStation)
          if (node.nodeValue && (
              node.nodeValue.includes("NeedStation") || 
              node.nodeValue === "Need" || 
              node.nodeValue === "Station")) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip invisible nodes or empty text
          if (!node.parentNode || 
              node.parentNode.offsetParent === null || 
              !node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip scripts, styles and other non-visible elements
          const parentTagName = node.parentNode.tagName?.toLowerCase();
          if (parentTagName === 'script' || 
              parentTagName === 'style' || 
              parentTagName === 'noscript') {
            return NodeFilter.FILTER_REJECT;
          }
          
          // Skip elements with data-no-translate attribute
          let parent = node.parentNode;
          while (parent) {
            if (parent.getAttribute && 
                parent.getAttribute('data-no-translate') === 'true') {
              return NodeFilter.FILTER_REJECT;
            }
            parent = parent.parentNode;
          }
          
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );
    
    // Collect nodes to translate
    let nodes = [];
    let nodesToTranslate = [];
    let node;
    
    while ((node = walker.nextNode())) {
      const text = node.nodeValue.trim();
      
      // Skip empty text
      if (!text) continue;
      
      // Check if this text is already in cache
      if (safeWindow.translationCache?.[this.currentLang]?.[text]) {
        console.log('Found in cache:', text, '->', safeWindow.translationCache[this.currentLang][text]);
        node.nodeValue = node.nodeValue.replace(
          text, 
          safeWindow.translationCache[this.currentLang][text]
        );
      } else {
        console.log('Adding to translation queue:', text);
        nodes.push(node);
        nodesToTranslate.push(text);
      }
    }
    
    // If we have nodes that need translation
    if (nodesToTranslate.length > 0) {
      try {
        // Split into smaller batches for faster processing (max 100 items per batch)
        const batchSize = 100;
        const batches = [];
        
        for (let i = 0; i < nodesToTranslate.length; i += batchSize) {
          batches.push(nodesToTranslate.slice(i, i + batchSize));
        }
        
        // Translate all batches in parallel for speed
        const batchResults = await Promise.all(
          batches.map(batch => 
            axios.post("http://localhost:8080/api/translate/batch", {
              texts: batch,
              lang: this.currentLang,
            })
          )
        );
        
        // Flatten the results
        let allTranslations = [];
        batchResults.forEach(result => {
          allTranslations = [...allTranslations, ...result.data.translations];
        });
        
        // Apply translations and update cache
        nodes.forEach((node, idx) => {
          const originalText = nodesToTranslate[idx];
          const translatedText = allTranslations[idx];
          
          // Update cache
          if (!safeWindow.translationCache[this.currentLang]) {
            safeWindow.translationCache[this.currentLang] = {};
          }
          safeWindow.translationCache[this.currentLang][originalText] = translatedText;
          
          // Update node text
          node.nodeValue = node.nodeValue.replace(originalText, translatedText);
        });
      } catch (error) {
        console.error("Translation failed:", error);
      }
    }
    
    // Calculate time taken and log for optimization
    const endTime = performance.now();
    console.log(`Translation completed in ${(endTime - startTime).toFixed(2)}ms`);
    
    this.translating = false;
  }

  /**
   * Set the current language and translate the page
   */
  async setLanguage(langCode) {
    console.log('setLanguage called with:', langCode);
    this.currentLang = langCode;
    
    // Safely set localStorage
    if (isBrowser) {
      try {
        localStorage.setItem('needstation-language', langCode);
        console.log('Language preference saved to localStorage');
      } catch (e) {
        console.error('Error setting localStorage:', e);
      }
    }
    
    // Translate the page if not English
    if (langCode !== 'en') {
      console.log('Calling translatePage for non-English language');
      try {
        await this.translatePage();
        console.log('Translation completed successfully');
      } catch (error) {
        console.error('Error during translation:', error);
      }
    } else if (isBrowser) {
      console.log('English selected, reloading page');
      // Refresh to restore original text for English
      window.location.reload();
    }
    
    return true; // Return success indicator
  }
  
  /**
   * Get the current language
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
}

// Create singleton instance
const translationService = new TranslationService();
export default translationService;
