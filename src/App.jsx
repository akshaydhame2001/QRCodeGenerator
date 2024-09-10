import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react"; // Named import
import "./App.css";

function App() {
  const [links, setLinks] = useState([""]);

  const handleChange = (e, index) => {
    const updatedLinks = [...links];
    updatedLinks[index] = e.target.value;
    setLinks(updatedLinks);
  };

  const addLink = () => {
    setLinks([...links, ""]);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>

      {links.map((link, index) => (
        <div key={index} className="link-input">
          <input
            type="text"
            placeholder={`Enter link ${index + 1}`}
            value={link}
            onChange={(e) => handleChange(e, index)}
            className="input-link"
          />
          <button onClick={() => removeLink(index)} className="remove-btn">
            Remove
          </button>
          <div className="qr-code">
            {link && <QRCodeSVG value={link} size={200} />}
          </div>
        </div>
      ))}

      <button onClick={addLink} className="add-btn">
        Add Another Link
      </button>
    </div>
  );
}

export default App;
