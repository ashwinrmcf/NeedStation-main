import axios from 'axios';

// Create a safe reference to window
const isBrowser = typeof window !== 'undefined';
const safeWindow = isBrowser ? window : {};

<<<<<<< HEAD
// Global translation cache
if (isBrowser) {
  safeWindow.translationCache = safeWindow.translationCache || {};
=======
// Global translation cache and state
if (isBrowser) {
  safeWindow.translationCache = safeWindow.translationCache || {};
  safeWindow.needStationTranslationReady = safeWindow.needStationTranslationReady || false;
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d
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
    
<<<<<<< HEAD
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
=======
    try {
      // Set global translation state
      safeWindow.needStationTranslationReady = true;
      
      // Protect logo and other elements first
      this.protectElements();
      
      // Create observer for dynamic content if not already running
      this.setupDynamicContentObserver();
      
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
          
          // Mark this node as translated
          node.parentNode?.setAttribute('data-translated', 'true');
        } else {
          console.log('Adding to translation queue:', text);
          nodes.push(node);
          nodesToTranslate.push(text);
        }
      }
      
      // If we have nodes that need translation
      if (nodesToTranslate.length > 0) {
        try {
          // Split into smaller batches for faster processing (max 50 items per batch)
          const batchSize = 50;
          const batches = [];
          
          for (let i = 0; i < nodesToTranslate.length; i += batchSize) {
            batches.push(nodesToTranslate.slice(i, i + batchSize));
          }
          
          try {
            // First check if the API is available with a small test request
            const testResponse = await axios.post("http://localhost:8080/api/translate/batch", {
              texts: ["test"],
              lang: this.currentLang,
            }, { timeout: 3000 }); // Adding timeout for faster feedback
            
            console.log('API connection test successful:', testResponse.status);
            
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
              if (result.data && result.data.translations) {
                allTranslations = [...allTranslations, ...result.data.translations];
              }
            });
          } catch (error) {
            console.error('Translation API connection failed:', error.message);
            
            // For demo/development, generate mock translations if API is down
            alert('Translation API is not available. Using mock translations instead.');
            
            // Create simple mock translations by adding language prefix to each text
            let allTranslations = nodesToTranslate.map(text => `[${this.currentLang}] ${text}`);
            
            // Apply these mock translations
            nodes.forEach((node, idx) => {
              const originalText = nodesToTranslate[idx];
              const mockTranslation = allTranslations[idx];
              
              // Update the text with mock translation
              node.nodeValue = node.nodeValue.replace(originalText, mockTranslation);
              node.parentNode?.setAttribute('data-translated', 'true');
            });
            
            return; // Exit the translation process after applying mocks
          }
          
          // Apply translations and update cache
          nodes.forEach((node, idx) => {
            const originalText = nodesToTranslate[idx];
            const translatedText = allTranslations[idx];
            
            if (translatedText) {
              // Update cache
              if (!safeWindow.translationCache[this.currentLang]) {
                safeWindow.translationCache[this.currentLang] = {};
              }
              safeWindow.translationCache[this.currentLang][originalText] = translatedText;
              
              // Update node text
              node.nodeValue = node.nodeValue.replace(originalText, translatedText);
              
              // Mark this node as translated
              node.parentNode?.setAttribute('data-translated', 'true');
            }
          });
          
          // Save cache to localStorage for persistence across page loads
          this.persistTranslationCache();
        } catch (error) {
          console.error("Translation failed:", error);
        }
      }
      
      // Calculate time taken and log for optimization
      const endTime = performance.now();
      console.log(`Translation completed in ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
      console.error('Error during page translation:', error);
    } finally {
      this.translating = false;
    }
  }

  /**
   * Save translation cache to localStorage for persistence across page navigation
   */
  persistTranslationCache() {
    if (!isBrowser) return;
    
    try {
      // We only store the current language cache to save space
      if (this.currentLang !== 'en' && safeWindow.translationCache?.[this.currentLang]) {
        const cacheToStore = {
          language: this.currentLang,
          entries: safeWindow.translationCache[this.currentLang]
        };
        
        localStorage.setItem('needstation-translation-cache', JSON.stringify(cacheToStore));
        console.log('Translation cache saved to localStorage');
      }
    } catch (error) {
      console.error('Error saving translation cache:', error);
    }
  }
  
  /**
   * Load translation cache from localStorage
   */
  loadTranslationCache() {
    if (!isBrowser) return;
    
    try {
      const cachedData = localStorage.getItem('needstation-translation-cache');
      
      if (cachedData) {
        const parsedCache = JSON.parse(cachedData);
        
        if (parsedCache.language && parsedCache.entries) {
          if (!safeWindow.translationCache) {
            safeWindow.translationCache = {};
          }
          
          safeWindow.translationCache[parsedCache.language] = parsedCache.entries;
          console.log(`Loaded ${Object.keys(parsedCache.entries).length} cached translations for ${parsedCache.language}`);
        }
      }
    } catch (error) {
      console.error('Error loading translation cache:', error);
    }
  }
  
  /**
   * Sets up an observer to translate dynamically added content
   */
  setupDynamicContentObserver() {
    if (!isBrowser || this.contentObserver) return;
    
    try {
      // Create a mutation observer to catch dynamically added content
      this.contentObserver = new MutationObserver((mutations) => {
        // Don't process if language is English or we're already translating
        if (this.currentLang === 'en' || this.translating) return;
        
        const newNodes = [];
        const textsToTranslate = [];
        
        // Look for new text nodes in added or modified DOM elements
        mutations.forEach(mutation => {
          // Handle added nodes
          if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach(node => {
              // Skip non-element nodes and already translated elements
              if (node.nodeType !== Node.ELEMENT_NODE || 
                  node.getAttribute?.('data-translated') === 'true' ||
                  node.getAttribute?.('data-no-translate') === 'true') {
                return;
              }
              
              // Find all text nodes within this element
              const walker = document.createTreeWalker(
                node,
                NodeFilter.SHOW_TEXT,
                {
                  acceptNode: (textNode) => {
                    // Apply the same filters as in translatePage
                    const text = textNode.nodeValue?.trim();
                    if (!text) return NodeFilter.FILTER_REJECT;
                    
                    // Skip nodes that are part of the logo (NeedStation)
                    if (text.includes("NeedStation") || text === "Need" || text === "Station") {
                      return NodeFilter.FILTER_REJECT;
                    }
                    
                    // Skip if parent has data-no-translate
                    let parent = textNode.parentNode;
                    while (parent) {
                      if (parent.getAttribute && 
                          parent.getAttribute('data-no-translate') === 'true') {
                        return NodeFilter.FILTER_REJECT;
                      }
                      parent = parent.parentNode;
                    }
                    
                    return NodeFilter.FILTER_ACCEPT;
                  }
                }
              );
              
              let textNode;
              while (textNode = walker.nextNode()) {
                const text = textNode.nodeValue.trim();
                
                // Apply cached translation if available
                if (safeWindow.translationCache?.[this.currentLang]?.[text]) {
                  textNode.nodeValue = textNode.nodeValue.replace(
                    text,
                    safeWindow.translationCache[this.currentLang][text]
                  );
                  textNode.parentNode?.setAttribute('data-translated', 'true');
                } else {
                  // Queue for translation
                  newNodes.push(textNode);
                  textsToTranslate.push(text);
                }
              }
            });
          }
        });
        
        // If we have new text to translate, do it in batches
        if (textsToTranslate.length > 0) {
          console.log(`Translating ${textsToTranslate.length} new dynamic elements`);
          
          // Don't block UI with await, run as a separate async operation
          this.translateDynamicContent(newNodes, textsToTranslate);
        }
      });
      
      // Start observing the entire document for changes
      this.contentObserver.observe(document.body, {
        childList: true, // Watch for added/removed nodes
        subtree: true,   // Watch the entire subtree
        characterData: false // Don't need to watch for text changes
      });
      
      console.log('Dynamic content observer started');
    } catch (error) {
      console.error('Error setting up dynamic content observer:', error);
    }
  }
  
  /**
   * Translates dynamically added content
   */
  async translateDynamicContent(nodes, textsToTranslate) {
    if (nodes.length === 0 || this.currentLang === 'en') return;
    
    try {
      // Use the batch API to translate multiple texts at once
      const response = await axios.post("http://localhost:8080/api/translate/batch", {
        texts: textsToTranslate,
        lang: this.currentLang,
      });
      
      if (response.data && response.data.translations) {
        // Apply translations to nodes
        nodes.forEach((node, idx) => {
          const originalText = textsToTranslate[idx];
          const translatedText = response.data.translations[idx];
          
          if (translatedText) {
            // Update the node text
            node.nodeValue = node.nodeValue.replace(originalText, translatedText);
            
            // Mark as translated
            node.parentNode?.setAttribute('data-translated', 'true');
            
            // Cache the translation
            if (!safeWindow.translationCache[this.currentLang]) {
              safeWindow.translationCache[this.currentLang] = {};
            }
            safeWindow.translationCache[this.currentLang][originalText] = translatedText;
          }
        });
        
        // Update the cache in localStorage
        this.persistTranslationCache();
      }
    } catch (error) {
      console.error('Error translating dynamic content:', error);
    }
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d
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
<<<<<<< HEAD
=======
        
        // Set a flag to indicate translation should happen on all page loads
        if (langCode !== 'en') {
          sessionStorage.setItem('needstation-auto-translate', 'true');
        } else {
          sessionStorage.removeItem('needstation-auto-translate');
        }
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d
      } catch (e) {
        console.error('Error setting localStorage:', e);
      }
    }
    
    // Translate the page if not English
    if (langCode !== 'en') {
      console.log('Calling translatePage for non-English language');
      try {
<<<<<<< HEAD
=======
        // Load any cached translations first
        this.loadTranslationCache();
        
        // Translate the current page
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d
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
