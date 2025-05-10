import React, { useState } from "react";
import axios from "axios";
import styles from "./TranslationCenter.module.css";

export default function TranslationCenter() {
  const [targetLang, setTargetLang] = useState("en");
  const [translating, setTranslating] = useState(false);

  // Languages available for translation
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "ja", name: "Japanese", flag: "🇯🇵" },
    { code: "zh", name: "Chinese", flag: "🇨🇳" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" },
    { code: "ru", name: "Russian", flag: "🇷🇺" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "bn", name: "Bengali", flag: "🇧🇩" },
  ];

  const handleTranslate = async (langCode) => {
    setTargetLang(langCode);
    setTranslating(true);
    
    // Get all text nodes on the page
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Only translate visible text nodes
          if (node.parentNode && node.parentNode.offsetParent !== null && node.nodeValue.trim()) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        },
      }
    );

    let nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      nodes.push(node);
    }

    // Send all text for translation in one go (or batch if too large)
    const texts = nodes.map((n) => n.nodeValue);
    try {
      const response = await axios.post("http://localhost:8080/api/translate/batch", {
        texts,
        lang: langCode,
      });
      // Replace text with translated text
      response.data.translations.forEach((translated, idx) => {
        nodes[idx].nodeValue = translated;
      });
    } catch (error) {
      console.error("Translation failed:", error);
      alert("Translation failed. Please try again later.");
    }
    setTranslating(false);
  };

  return (
    <div className="container my-5">
      <div className={styles.translationHeader}>
        <h1 className="text-4xl font-bold mb-2">Language <span className="text-teal-400">Settings</span></h1>
        <p className="text-lg mb-8">Select your preferred language to translate our entire website.</p>
      </div>

      {translating && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Translating content to {languages.find(l => l.code === targetLang)?.name}...</p>
        </div>
      )}

      <div className={styles.languageGrid}>
        {languages.map((lang) => (
          <div 
            key={lang.code} 
            className={`${styles.languageCard} ${targetLang === lang.code ? styles.active : ''}`}
            onClick={() => handleTranslate(lang.code)}
          >
            <div className={styles.flag}>{lang.flag}</div>
            <h3>{lang.name}</h3>
            <p className={styles.code}>{lang.code.toUpperCase()}</p>
          </div>
        ))}
      </div>

      <div className={styles.infoSection}>
        <h2 className="text-2xl font-bold mb-2">Why Translate?</h2>
        <p>We believe in making our services accessible to everyone. Our translation feature allows you to view our entire website in your preferred language, making it easier to navigate and understand our offerings.</p>
        
        <div className={styles.note}>
          <h3 className="text-xl font-bold mb-2">Please Note</h3>
          <p>Our translation service uses Google Translate API. While we strive for accuracy, some translations may not be perfect.</p>
        </div>
      </div>
    </div>
  );
}
