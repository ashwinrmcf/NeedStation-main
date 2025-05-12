import React, { useState } from "react";
import axios from "axios";

export default function Translator() {
  const [text, setText] = useState("Hello");
  const [translated, setTranslated] = useState("");

  const translateText = async (lang) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/translate?text=${encodeURIComponent(text)}&lang=${lang}`
      );
      setTranslated(response.data);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslated("Error in translation");
    }
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={() => translateText("hi")}>Translate to Hindi</button>
      <p>Translated: {translated}</p>
    </div>
  );
}

