import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardCard from '../components/DashboardCard';
import { Opportunity, Resource, VolunteerSignup } from '../types';
import { Heart, Gift, Users, Calendar, ArrowRight, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [signups, setSignups] = useState<VolunteerSignup[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch user profile
        const { data: profileData } = await api.get('/users');
          
        if (profileData) {
          setUserName(profileData.full_name);
        }
        
        // Fetch volunteer signups with opportunity details
        const { data: signupsData } = await api.get('/opportunities/signups');
        
        // Transform the data to match our types
        const formattedSignups = signupsData.map((signup: any) => ({
          id: signup._id,
          user_id: signup.user_id,
          opportunity_id: signup.opportunity_id._id,
          status: signup.status,
          opportunity: signup.opportunity_id,
        }));
        
        setSignups(formattedSignups);
        
        // Fetch user's resources
        const { data: resourcesData } = await api.get('/resources/my-resources');
        
        setResources(resourcesData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {userName || 'Volunteer'}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Your personal dashboard for volunteer activities and resource exchanges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* My Opportunities */}
            <DashboardCard 
              title="My Opportunities" 
              icon={<Heart className="h-6 w-6 text-blue-500" />}
              className="lg:col-span-2"
            >
              {signups.length > 0 ? (
                <div className="space-y-4">
                  {signups.slice(0, 3).map((signup) => (
                    <div key={signup.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <h3 className="font-semibold text-lg text-gray-900">{signup.opportunity?.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(signup.opportunity?.date || '').toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{signup.opportunity?.location}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          signup.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : signup.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                        }`}>
                          {signup.status.charAt(0).toUpperCase() + signup.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {signups.length > 3 && (
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-500">
                        + {signups.length - 3} more opportunities
                      </span>
                    </div>
                  )}
                  
                  <Link 
                    to="/opportunities" 
                    className="block text-blue-600 font-medium hover:text-blue-500 mt-4"
                  >
                    View all opportunities
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">You haven't signed up for any opportunities yet.</p>
                  <Link 
                    to="/opportunities" 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Find Opportunities
                  </Link>
                </div>
              )}
            </DashboardCard>
            
            {/* Resources */}
            <DashboardCard 
              title="My Resources" 
              icon={<Gift className="h-6 w-6 text-teal-500" />}
            >
              {resources.length > 0 ? (
                <div className="space-y-4">
                  {resources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg text-gray-900">{resource.resource_name}</h3>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          resource.type === 'offer' 
                            ? 'bg-teal-100 text-teal-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm mt-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{resource.location}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        Quantity: {resource.quantity}
                      </div>
                    </div>
                  ))}
                  
                  {resources.length > 3 && (
                    <div className="text-center mt-4">
                      <span className="text-sm text-gray-500">
                        + {resources.length - 3} more resources
                      </span>
                    </div>
                  )}
                  
                  <Link 
                    to="/resources" 
                    className="block text-teal-600 font-medium hover:text-teal-500 mt-4"
                  >
                    View all resources
                  </Link>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">You haven't offered or requested any resources yet.</p>
                  <Link 
                    to="/resources" 
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                  >
                    Resource Exchange
                  </Link>
                </div>
              )}
            </DashboardCard>
            
            {/* Explore More */}
            <DashboardCard 
              title="Explore More" 
              icon={<Users className="h-6 w-6 text-orange-500" />}
              className="lg:col-span-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/opportunities"
                  className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <Heart className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-medium text-blue-900">Volunteer Opportunities</h3>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Find chances to give back to your community.
                  </p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    Browse opportunities
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
                
                <Link
                  to="/resources"
                  className="block p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <Gift className="h-5 w-5 text-teal-600 mr-2" />
                    <h3 className="font-medium text-teal-900">Resource Exchange</h3>
                  </div>
                  <p className="text-sm text-teal-700 mb-3">
                    Offer or request resources to help others.
                  </p>
                  <div className="flex items-center text-teal-600 text-sm font-medium">
                    View exchange
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
                
                <Link
                  to="/community-tips"
                  className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <div className="flex items-center mb-2">
                    <Users className="h-5 w-5 text-orange-600 mr-2" />
                    <h3 className="font-medium text-orange-900">Community Tips</h3>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    Learn best practices for volunteer work.
                  </p>
                  <div className="flex items-center text-orange-600 text-sm font-medium">
                    Read tips
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              </div>
            </DashboardCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;