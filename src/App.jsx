import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react"; // Import from qrcode.react
import { toPng } from "html-to-image"; // Import html-to-image for image download
import "./App.css";

function App() {
  const [links, setLinks] = useState([""]); // Manage multiple links
  const qrRefs = useRef([]); // Store references to QR code containers

  // Handle change in input field for a specific link index
  const handleChange = (e, index) => {
    const updatedLinks = [...links];
    updatedLinks[index] = e.target.value;
    setLinks(updatedLinks);
  };

  // Add a new input field for a new link
  const addLink = () => {
    setLinks([...links, ""]);
  };

  // Remove a link from the list
  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  // Download QR code as an image
  const downloadQRCode = (index) => {
    const qrElement = qrRefs.current[index];
    toPng(qrElement)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `qr-code-${index + 1}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating QR code image:", err);
      });
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>

      {/* Iterate over each link input */}
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

          {/* Display QR code for the link */}
          <div className="qr-code" ref={(el) => (qrRefs.current[index] = el)}>
            {link && <QRCodeSVG value={link} size={200} />}
          </div>

          {/* Download button for each QR code */}
          {link && (
            <button
              onClick={() => downloadQRCode(index)}
              className="download-btn"
            >
              Download QR
            </button>
          )}
        </div>
      ))}

      <button onClick={addLink} className="add-btn">
        Add Another Link
      </button>
    </div>
  );
}

export default App;
