import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OpportunityCard from '../components/OpportunityCard';
import { Opportunity, VolunteerSignup } from '../types';
import { Filter, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const categories = [
  'All Categories',
  'Education',
  'Health',
  'Environment',
  'Technology',
  'Arts',
  'Community',
];

const Opportunities: React.FC = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [signups, setSignups] = useState<VolunteerSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showFilters, setShowFilters] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newOpportunity, setNewOpportunity] = useState<Partial<Opportunity>>({
    title: '',
    description: '',
    category: 'Community',
    location: '',
    date: '',
    contact: '',
  });

  useEffect(() => {
    fetchOpportunities();
  }, [user]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      
      // Fetch opportunities
      const { data: opportunitiesData } = await api.get('/opportunities');
      
      setOpportunities(opportunitiesData || []);
      
      if (user) {
        // Fetch user's signups
        const { data: signupsData } = await api.get('/opportunities/signups');
        
        setSignups(signupsData || []);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (opportunityId: number) => {
    if (!user) {
      toast.error('Please log in to sign up for opportunities');
      return;
    }
    
    try {
      // Check if already signed up
      const isAlreadySignedUp = signups.some(
        (signup) => signup.opportunity_id === opportunityId
      );
      
      if (isAlreadySignedUp) {
        toast.error('You have already signed up for this opportunity');
        return;
      }
      
      await api.post('/opportunities/signup', {
        opportunity_id: opportunityId,
      });
      
      toast.success('Successfully signed up for this opportunity!');
      fetchOpportunities(); // Refresh data
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Failed to sign up for this opportunity');
    }
  };

  const handleCreateOpportunity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to create opportunities');
      return;
    }
    
    try {
      await api.post('/opportunities', newOpportunity);
      
      toast.success('Opportunity created successfully!');
      setIsCreating(false);
      setNewOpportunity({
        title: '',
        description: '',
        category: 'Community',
        location: '',
        date: '',
        contact: '',
      });
      fetchOpportunities(); // Refresh data
    } catch (error) {
      console.error('Error creating opportunity:', error);
      toast.error('Failed to create opportunity');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewOpportunity((prev) => ({ ...prev, [name]: value }));
  };

  const filteredOpportunities = opportunities.filter((opportunity) => {
    // Filter by search term
    const matchesSearch = 
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filter by category
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      opportunity.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  const isSignedUp = (opportunityId: number) => {
    return signups.some((signup) => signup.opportunity_id === opportunityId);
  };

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
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Volunteer Opportunities</h1>
              <p className="mt-2 text-lg text-gray-600">
                Find a chance to make a difference in your community.
              </p>
            </div>
            {user && (
              <button
                onClick={() => setIsCreating(!isCreating)}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isCreating ? 'Cancel' : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Opportunity
                  </>
                )}
              </button>
            )}
          </div>
          
          {isCreating && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Opportunity</h2>
              <form onSubmit={handleCreateOpportunity}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={newOpportunity.title}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      id="category"
                      required
                      value={newOpportunity.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.filter(c => c !== 'All Categories').map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      required
                      value={newOpportunity.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      value={newOpportunity.date}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contact"
                      id="contact"
                      required
                      value={newOpportunity.contact}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      required
                      value={newOpportunity.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Opportunity
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div className="mb-8">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter className="mr-2 h-5 w-5 text-gray-500" />
                Filters
              </button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-white rounded-md shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  onSignUp={handleSignUp}
                  alreadySignedUp={isSignedUp(opportunity.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedCategory !== 'All Categories'
                  ? 'No opportunities match your search criteria.'
                  : 'No opportunities available at the moment.'}
              </p>
              {user && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Opportunity
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Opportunities;