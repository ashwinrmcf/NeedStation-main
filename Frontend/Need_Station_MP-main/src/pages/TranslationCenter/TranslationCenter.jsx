import React, { useState, useEffect } from "react";
import styles from "./TranslationCenter.module.css";
import translationService from "../../services/TranslationService";

export default function TranslationCenter() {
  // Initialize with translation service language preference
  const [targetLang, setTargetLang] = useState(() => {
    return translationService.getCurrentLanguage();
  });
  const [translating, setTranslating] = useState(false);

  // Languages available for translation
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", description: "United States" },
    { code: "hi", name: "Hindi", flag: "🇮🇳", description: "India" },
    { code: "ta", name: "Tamil", flag: "🇮🇳", description: "India" },
    { code: "bn", name: "Bengali", flag: "🇮🇳", description: "India" },
    { code: "ml", name: "Malayalam", flag: "🇮🇳", description: "India" },
    { code: "te", name: "Telugu", flag: "🇮🇳", description: "India" },
    { code: "kn", name: "Kannada", flag: "🇮🇳", description: "India" },
    { code: "gu", name: "Gujarati", flag: "🇮🇳", description: "India" },
  ];

  // Use translation service on component mount
  useEffect(() => {
    // Highlight the currently selected language
    setTargetLang(translationService.getCurrentLanguage());
  }, []);

  const handleTranslate = async (langCode) => {
    setTranslating(true);
    setTargetLang(langCode);
    
    try {
      // Use the translation service to handle the translation
      await translationService.setLanguage(langCode);
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="container page-content-spacing">
      <div className={styles.translationHeader}>
        <h1 className="text-4xl font-bold mb-2 text-white">Language <span className="text-teal-400">Settings</span></h1>
        <p className="text-lg mb-5 text-white">Select your preferred language to translate our entire website.</p>
        <div className={styles.headerAccent}></div>
      </div>

      {translating && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Translating content to {languages.find(l => l.code === targetLang)?.name}...</p>
          <p className={styles.smallNote}>This may take a moment. Please wait...</p>
        </div>
      )}

      <div className={styles.languageSection}>
        <div className={styles.gridContainer}>
          <div className={styles.languageGrid}>
            {languages.map((lang) => (
            <div 
              key={lang.code} 
              className={`${styles.languageCard} ${targetLang === lang.code ? styles.active : ''}`}
              onClick={() => handleTranslate(lang.code)}
            >
              <div className={styles.cardContent}>
                <div className={styles.flag}>{lang.flag}</div>
                <h3>{lang.name}</h3>
                <p className={styles.countryName}>{lang.description}</p>
                <p className={styles.code}>{lang.code.toUpperCase()}</p>
              </div>
              <div className={styles.selectButton} onClick={() => handleTranslate(lang.code)}>
                {targetLang === lang.code ? 'Selected' : 'Select'}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoHeader}>
          <h2 className="font-bold">Why <span className="text-teal-400">Translate</span>?</h2>
        </div>
        <p className={styles.infoParagraph}>We believe in making our services accessible to everyone. Our translation feature allows you to view our entire website in your preferred language, making it easier to navigate and understand our offerings.</p>
        
        <div className={styles.note}>
          <div className={styles.noteIcon}>ℹ️</div>
          <div>
            <h3 className="font-bold text-lg">Please Note</h3>
            <p className="text-white">Our translation service uses Google Translate API. While we strive for accuracy, some translations may not be perfect.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
