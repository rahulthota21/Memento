import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookMarked } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || !isLandingPage 
        ? 'bg-white shadow-md py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookMarked className="h-8 w-8 text-indigo-500" />
            <span className="text-xl font-bold font-playfair">Memento</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium hover:text-indigo-500 transition-colors ${
              location.pathname === '/' ? 'text-indigo-500' : ''
            }`}>
              Home
            </Link>
            <Link to="/dashboard" className={`font-medium hover:text-indigo-500 transition-colors ${
              location.pathname === '/dashboard' ? 'text-indigo-500' : ''
            }`}>
              Dashboard
            </Link>
            <Link to="/todos" className={`font-medium hover:text-indigo-500 transition-colors ${
              location.pathname === '/todos' ? 'text-indigo-500' : ''
            }`}>
              To-Do List
            </Link>
            <Link to="/diary" className={`font-medium hover:text-indigo-500 transition-colors ${
              location.pathname === '/diary' ? 'text-indigo-500' : ''
            }`}>
              Diary
            </Link>
            <button className="btn btn-primary">
              Sign In
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 fade-in">
            <Link 
              to="/" 
              className="block py-2 hover:text-indigo-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/dashboard" 
              className="block py-2 hover:text-indigo-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/todos" 
              className="block py-2 hover:text-indigo-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              To-Do List
            </Link>
            <Link 
              to="/diary" 
              className="block py-2 hover:text-indigo-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Diary
            </Link>
            <button 
              className="btn btn-primary w-full"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;