import React, { useState } from 'react';
import axios from 'axios';
import { API_URL, CONTENT_TYPE_HEADER, RESPONSE_TYPE_JSON } from './constants';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('logFile', file);

    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': CONTENT_TYPE_HEADER },
        responseType: RESPONSE_TYPE_JSON,
      });

      // console.log('Parsed logs:', response.data);

      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'parsed_logs.json';

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      setError('Error parsing logs');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <input type="file" onChange={handleFileChange} className="file-input" />
      <button onClick={handleUpload} disabled={loading} className="button">
        {loading ? (
          <>
            <span className="loader" /> Uploading...
          </>
        ) : (
          'Upload'
        )}
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default App;
