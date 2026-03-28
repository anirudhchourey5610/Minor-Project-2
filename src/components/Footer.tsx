import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">HelpHub</span>
            </Link>
            <p className="mt-4 text-sm text-gray-300">
              Empowering communities through volunteerism and resource sharing.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="text-base text-gray-300 hover:text-white">
                  Opportunities
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-base text-gray-300 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/community-tips" className="text-base text-gray-300 hover:text-white">
                  Community Tips
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Account
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/login" className="text-base text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-base text-gray-300 hover:text-white">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-base text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-base text-gray-300 hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Connect With Us
            </h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4">
              <Link to="/contact" className="flex items-center text-blue-400 hover:text-blue-300">
                <Mail className="h-5 w-5 mr-2" />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400">
            &copy; {new Date().getFullYear()} HelpHub. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;