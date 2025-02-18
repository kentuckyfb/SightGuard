import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from '../pages/components/Navbar';
import Footer from '../pages/components/Footer';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const { isDarkMode } = useTheme();

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const handleSubmit = async () => {
    if (files.length === 0) return;

    setIsLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const gradeDescriptions = [
    'No Diabetic Retinopathy',
    'Mild Nonproliferative Diabetic Retinopathy',
    'Moderate Nonproliferative Diabetic Retinopathy',
    'Severe Nonproliferative Diabetic Retinopathy',
    'Proliferative Diabetic Retinopathy',
  ];

  const progressBarColors = [
    '#10B981', // Green for Grade 0
    '#F59E0B', // Yellow for Grade 1
    '#F97316', // Orange for Grade 2
    '#EF4444', // Red for Grade 3
    '#DC2626', // Dark Red for Grade 4
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-4">
        <div className="text-center w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-8">
            Upload Images
          </h1>
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-700 dark:text-gray-300">Processing images...</p>
            </div>
          ) : prediction !== null ? (
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Semi-Circle Progress Bar */}
              {/* Replace CircularProgressbar with MUI's CircularProgress */}
              <div className="w-48 h-48 flex flex-col items-center">
                <CircularProgress
                  variant="determinate"
                  value={(prediction + 1) * 20}
                  size={120}
                  thickness={5}
                  sx={{ color: progressBarColors[prediction] }}
                />
                <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
                  {gradeDescriptions[prediction]}
                </p>
              </div>

              {/* Vertical Line */}
              <div className="h-48 w-px bg-gray-300 dark:bg-gray-600 hidden md:block"></div>

              {/* Uploaded Image */}
              <div className="flex-1 max-w-md">
                <img
                  src={URL.createObjectURL(files[0])}
                  alt="Uploaded Fundus"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`${isDarkMode ? 'bg-green-800' : 'bg-green-100'
                } bg-opacity-50 backdrop-blur-md p-8 rounded-lg border-2 border-dashed ${isDarkMode ? 'border-green-600' : 'border-green-200'
                } cursor-pointer ${isDarkMode ? 'hover:bg-green-900' : 'hover:bg-green-200'
                } transition-colors`}
            >
              <input {...getInputProps()} />
              <FiUploadCloud
                className={`mx-auto text-4xl ${isDarkMode ? 'text-green-400' : 'text-green-600'
                  } mb-4`}
              />
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Drag & drop fundus images here, or click to select files
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                Max file size: 100MB
              </p>
              {files.length > 0 && (
                <div className="mt-4">
                  <h4 className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    Selected Files:
                  </h4>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {file.name} - {(file.size / 1024 / 1024).toFixed(2)}MB
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleSubmit}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Submit Images
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}