// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } bg-opacity-75 backdrop-blur-md shadow-md p-4 fixed top-4 left-1/2 transform -translate-x-1/2 rounded-lg w-[70vw] max-w-7xl z-50`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/icon.png" alt="Website Logo" width={160} height={160} className="mr-2" />
          <span className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-green-600`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-green-600`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-green-600`}
          >
            Contact Us
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <FiSun className="text-yellow-400" /> : <FiMoon className="text-gray-700" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;