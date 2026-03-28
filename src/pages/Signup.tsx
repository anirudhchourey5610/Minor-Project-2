import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';
import { Heart } from 'lucide-react';

const Signup: React.FC = () => {
  const { user, signUp, loading } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <Heart className="h-12 w-12 text-blue-500 mx-auto" />
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
              Join the HelpHub Community
            </h1>
          </div>
          
          <AuthForm 
            mode="signup" 
            onSubmit={signUp} 
            isLoading={loading} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;