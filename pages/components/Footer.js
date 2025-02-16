// components/Footer.js
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      } bg-opacity-75 backdrop-blur-md shadow-md p-8 w-[70vw] max-w-8xl mx-auto`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Website Icon and Name */}
        <div className="flex items-center space-x-2">
          <Image src="/icon.png" alt="Website Logo" width={220} height={220} />
          <span className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            
          </span>
        </div>

        {/* Navigation Menu */}
        <div className="space-y-2">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            Quick Links
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/"
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-green-600`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-green-600`}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-green-600`}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            Sign Up for Newsletter
          </h3>
          <div className="mt-2 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full p-2 border ${
                isDarkMode ? 'border-green-600' : 'border-green-200'
              } rounded-l focus:outline-none focus:ring-2 ${
                isDarkMode ? 'focus:ring-green-400' : 'focus:ring-green-600'
              } bg-transparent ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}
            />
            <button
              className={`bg-green-600 text-white px-4 rounded-r hover:bg-green-700 transition-colors`}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mt-8`}>
        <p>&copy; 2023 SightGuard. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;