import React, { useState } from "react";

const VigenereCipher = () => {
  const key = "COVER"; // Change this key as needed (must be letters only)
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(false);

  const formatKey = (text, key) => {
    let formattedKey = "";
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
      if (/[a-z]/i.test(text[i])) {
        formattedKey += key[keyIndex % key.length];
        keyIndex++;
      } else {
        formattedKey += text[i]; // keep spacing and punctuation
      }
    }
    return formattedKey;
  };

  const encrypt = (text, key) => {
    key = formatKey(text, key.toUpperCase());
    return text.split("").map((char, i) => {
      if (!/[a-z]/i.test(char)) return char;
      const base = char === char.toUpperCase() ? 65 : 97;
      const shift = key[i].toUpperCase().charCodeAt(0) - 65;
      return String.fromCharCode(((char.charCodeAt(0) - base + shift) % 26) + base);
    }).join("");
  };

  const decrypt = (text, key) => {
    key = formatKey(text, key.toUpperCase());
    return text.split("").map((char, i) => {
      if (!/[a-z]/i.test(char)) return char;
      const base = char === char.toUpperCase() ? 65 : 97;
      const shift = key[i].toUpperCase().charCodeAt(0) - 65;
      return String.fromCharCode(((char.charCodeAt(0) - base - shift + 26) % 26) + base);
    }).join("");
  };

  const handleEncrypt = () => {
    if (!inputText.trim()) return;
    const encrypted = encrypt(inputText, key);
    setOutputText(encrypted);
    setIsEncrypted(true);
  };

  const handleDecrypt = () => {
    const decrypted = decrypt(outputText, key);
    setOutputText(decrypted);
    setIsEncrypted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg w-full max-w-md p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Vigenere Cipher</h1>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Enter Text:</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type something to encrypt..."
          />
        </div>

        <button
          onClick={handleEncrypt}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Encrypt
        </button>

        {outputText && (
          <div className="bg-gray-100 rounded-lg p-4 text-center shadow-inner">
            <p className="text-sm text-gray-500 mb-1">
              {isEncrypted ? "Encrypted Text:" : "Decrypted Text:"}
            </p>
            <p className="font-mono text-lg text-gray-800 break-words">{outputText}</p>
          </div>
        )}

        {isEncrypted && (
          <div className="text-center space-y-2">
            <p className="text-gray-600">Want to see the original text?</p>
            <button
              onClick={handleDecrypt}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Decrypt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VigenereCipher;
