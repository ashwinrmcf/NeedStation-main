<<<<<<< HEAD
import React, { useState } from "react";
import axios from "axios";
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Translator.css";
>>>>>>> 1008e561591a1687e1e5894e1664b046427cf89d

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

