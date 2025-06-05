import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function UploadProofPopup() {
  const [date, setDate] = useState('12/12/2025');
  const [viewCount, setViewCount] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting:', { date, viewCount, selectedFile });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <ChevronLeft className="w-5 h-5 text-gray-600 mr-3" />
          <h1 className="text-lg font-medium text-gray-900">Upload Proof</h1>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-4">
          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Count Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Count
            </label>
            <input
              type="text"
              placeholder="Enter number of views"
              value={viewCount}
              onChange={(e) => setViewCount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* File Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Screenshot of Today's Views
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50">
                <span className={`${selectedFile ? 'text-gray-900' : 'text-green-600'}`}>
                  {selectedFile ? selectedFile.name : 'Choose File'}
                </span>
                <span className="text-gray-500 text-xs">
                  {selectedFile ? '' : 'No file chosen'}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Max file size 2mb. Supported formats: JPG, PNG
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-400 hover:bg-green-500 text-white font-medium py-3 rounded-md text-sm transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}