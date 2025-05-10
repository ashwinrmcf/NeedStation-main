import React, { useState } from "react";
import axios from "axios";

export default function PageTranslator() {
  const [targetLang, setTargetLang] = useState("hi");
  const [translating, setTranslating] = useState(false);

  // This will translate all text nodes in the body
  const handleTranslatePage = async () => {
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
        lang: targetLang,
      });
      // Replace text with translated text
      response.data.translations.forEach((translated, idx) => {
        nodes[idx].nodeValue = translated;
      });
    } catch (error) {
      alert("Translation failed.");
    }
    setTranslating(false);
  };

  return (
    <div style={{ position: "fixed", top: 10, right: 10, zIndex: 9999 }}>
      <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="hi">Hindi</option>
        <option value="en">English</option>
        <option value="fr">French</option>
        {/* Add more languages as needed */}
      </select>
      <button onClick={handleTranslatePage} disabled={translating}>
        {translating ? "Translating..." : "Translate Page"}
      </button>
    </div>
  );
}