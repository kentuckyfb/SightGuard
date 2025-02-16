import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-8">About Us</h1>
          <p className="text-gray-700">We are a team dedicated to improving eye health through technology.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}