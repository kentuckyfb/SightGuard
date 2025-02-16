// pages/index.js
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import Navbar from '../pages/components/Navbar';
import Footer from '../pages/components/Footer';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const [files, setFiles] = useState([]);
  const { isDarkMode } = useTheme();

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-8">Upload Images</h1>
          <div
            {...getRootProps()}
            className={`${isDarkMode ? 'bg-green-800' : 'bg-green-100'} bg-opacity-50 backdrop-blur-md p-8 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-green-600' : 'border-green-200'} cursor-pointer ${isDarkMode ? 'hover:bg-green-900' : 'hover:bg-green-200'} transition-colors`}
          >
            <input {...getInputProps()} />
            <FiUploadCloud className={`mx-auto text-4xl ${isDarkMode ? 'text-green-400' : 'text-green-600'} mb-4`} />
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Drag & drop fundus images here, or click to select files</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Max file size: 100MB</p>
            {files.length > 0 && (
              <div className="mt-4">
                <h4 className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Selected Files:</h4>
                <ul>
                  {files.map((file, index) => (
                    <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}