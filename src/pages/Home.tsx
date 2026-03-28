import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Heart, Gift, Users, HandHelping, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 md:pr-12">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Connecting Hearts, Building Communities
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100">
                  Join HelpHub to volunteer, exchange resources, and make a real difference in your community.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
                  >
                    Join Now
                  </Link>
                  <Link
                    to="/opportunities"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 transition-colors"
                  >
                    Explore Opportunities
                  </Link>
                </div>
              </div>
              <div className="mt-10 md:mt-0 md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg" 
                  alt="Volunteers working together" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How HelpHub Works
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                A simple platform designed to connect volunteers with opportunities and facilitate resource sharing within communities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Find Opportunities</h3>
                <p className="text-gray-600 mb-4">
                  Discover volunteer opportunities in your area based on your interests and availability.
                </p>
                <Link 
                  to="/opportunities" 
                  className="text-blue-600 font-medium flex items-center hover:text-blue-500"
                >
                  Browse Opportunities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="bg-teal-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <Gift className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Exchange Resources</h3>
                <p className="text-gray-600 mb-4">
                  Offer items you don't need or request resources for those in need through our exchange platform.
                </p>
                <Link 
                  to="/resources" 
                  className="text-teal-600 font-medium flex items-center hover:text-teal-500"
                >
                  View Resource Exchange
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg">
                <div className="bg-orange-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Build Community</h3>
                <p className="text-gray-600 mb-4">
                  Connect with like-minded individuals and organizations to create lasting positive change.
                </p>
                <Link 
                  to="/community-tips" 
                  className="text-orange-600 font-medium flex items-center hover:text-orange-500"
                >
                  Community Tips
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Impact Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Impact
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Together, we're making a difference in communities worldwide.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-blue-600">500+</p>
                <p className="text-lg text-gray-700 mt-2">Active Volunteers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-blue-600">1,200+</p>
                <p className="text-lg text-gray-700 mt-2">Projects Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-blue-600">3,500+</p>
                <p className="text-lg text-gray-700 mt-2">Resources Shared</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-blue-600">25+</p>
                <p className="text-lg text-gray-700 mt-2">Communities Served</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 bg-gradient-to-r from-blue-500 to-blue-700 p-10 text-white">
                  <div className="h-full flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                    <p className="text-blue-100 mb-6">
                      Join our community of volunteers and resource providers to create positive change in your area.
                    </p>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
                    >
                      Get Started Today
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 p-10">
                  <div className="h-full flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <HandHelping className="h-6 w-6 text-blue-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Join as a Volunteer</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Find meaningful opportunities to contribute your time and skills to causes you care about.
                    </p>
                    
                    <div className="flex items-center mb-4">
                      <Gift className="h-6 w-6 text-blue-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Share Resources</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                      Offer items you no longer need or find resources for those who could use your help.
                    </p>
                    
                    <div className="flex items-center">
                      <Users className="h-6 w-6 text-blue-500 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900">Create Connections</h3>
                    </div>
                    <p className="text-gray-600">
                      Build relationships with others who share your passion for community service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;