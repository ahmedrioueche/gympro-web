import React, { useState } from 'react';
import { supabaseUploadImage } from '../../../utils/supabase';

const Test: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const uploadImage = async () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setUploading(true);
    setUploadStatus(null);
    const token = sessionStorage.getItem('token');
    try {
      const response = await supabaseUploadImage(token!, '1', file, 'logo');
      console.log('reponse', response);
    } catch (error) {
      console.log('error', error);
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">Upload Member Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none"
      />

      <button
        onClick={uploadImage}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>

      {uploadStatus && <p className="text-sm text-gray-600">{uploadStatus}</p>}
    </div>
  );
};

export default Test;
