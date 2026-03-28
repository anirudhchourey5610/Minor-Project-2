import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Heart, Gift, User, HelpCircle, LogOut, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Heart className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">HelpHub</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/opportunities" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/opportunities') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              Opportunities
            </Link>
            <Link 
              to="/resources" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/resources') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              Resources
            </Link>
            <Link 
              to="/community-tips" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/community-tips') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              Community Tips
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/contact') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center ml-4">
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/profile') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                  }`}
                >
                  Profile
                </Link>
                <button 
                  onClick={signOut}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center ml-4">
                <Link 
                  to="/login" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-blue-500 border border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>
            <Link
              to="/opportunities"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/opportunities') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Opportunities
              </div>
            </Link>
            <Link
              to="/resources"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/resources') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Resources
              </div>
            </Link>
            <Link
              to="/community-tips"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/community-tips') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" />
                Community Tips
              </div>
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/contact') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
              }`}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <span className="material-icons mr-2">contact_support</span>
                Contact
              </div>
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/dashboard') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                  }`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <span className="material-icons mr-2">dashboard</span>
                    Dashboard
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/profile') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-500 hover:bg-gray-50'
                  }`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;