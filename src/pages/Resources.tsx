import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResourceCard from '../components/ResourceCard';
import { Resource } from '../types';
import { Filter, Plus, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Resources: React.FC = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'offer' | 'request'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const [newResource, setNewResource] = useState<Partial<Resource>>({
    type: 'offer',
    resource_name: '',
    quantity: 1,
    location: '',
    description: '',
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      
      const { data } = await api.get('/resources');
      
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to create resource listings');
      return;
    }
    
    try {
      await api.post('/resources', newResource);
      
      toast.success('Resource listing created successfully!');
      setIsCreating(false);
      setNewResource({
        type: 'offer',
        resource_name: '',
        quantity: 1,
        location: '',
        description: '',
      });
      fetchResources(); // Refresh data
    } catch (error) {
      console.error('Error creating resource listing:', error);
      toast.error('Failed to create resource listing');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ 
      ...prev, 
      [name]: name === 'quantity' ? parseInt(value) || 1 : value 
    }));
  };

  const handleContactResource = (resource: Resource) => {
    setSelectedResource(resource);
    setContactModalOpen(true);
  };

  const handleSendMessage = () => {
    toast.success('Message sent! The provider will contact you soon.');
    setContactModalOpen(false);
    setSelectedResource(null);
  };

  const filteredResources = resources.filter((resource) => {
    // Filter by search term
    const matchesSearch = 
      resource.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Filter by type
    const matchesType = 
      selectedType === 'all' || 
      resource.type === selectedType;
      
    return matchesSearch && matchesType;
  });

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
              <h1 className="text-3xl font-bold text-gray-900">Resource Exchange</h1>
              <p className="mt-2 text-lg text-gray-600">
                Offer items you don't need or find resources for those who could use your help.
              </p>
            </div>
            {user && (
              <button
                onClick={() => setIsCreating(!isCreating)}
                className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                {isCreating ? 'Cancel' : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    List Resource
                  </>
                )}
              </button>
            )}
          </div>
          
          {isCreating && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Create Resource Listing</h2>
              <form onSubmit={handleCreateResource}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Listing Type
                    </label>
                    <select
                      name="type"
                      id="type"
                      required
                      value={newResource.type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="offer">I'm Offering</option>
                      <option value="request">I'm Requesting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="resource_name" className="block text-sm font-medium text-gray-700">
                      Resource Name
                    </label>
                    <input
                      type="text"
                      name="resource_name"
                      id="resource_name"
                      required
                      value={newResource.resource_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="E.g., Winter Coats, School Supplies, etc."
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      min="1"
                      required
                      value={newResource.quantity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                    />
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
                      value={newResource.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
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
                      value={newResource.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Describe the resource in detail (condition, size, etc.)"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    {newResource.type === 'offer' ? 'Offer Resource' : 'Request Resource'}
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
                  placeholder="Search resources..."
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
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedType === 'all'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setSelectedType('offer')}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedType === 'offer'
                        ? 'bg-teal-100 text-teal-800 border-teal-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Offerings
                  </button>
                  <button
                    onClick={() => setSelectedType('request')}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedType === 'request'
                        ? 'bg-orange-100 text-orange-800 border-orange-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Requests
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onContact={handleContactResource}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm || selectedType !== 'all'
                  ? 'No resources match your search criteria.'
                  : 'No resources available at the moment.'}
              </p>
              {user && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Resource Listing
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Contact Modal */}
      {contactModalOpen && selectedResource && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Contact about {selectedResource.resource_name}
                      </h3>
                      <button
                        onClick={() => setContactModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-4">
                        Send a message to the {selectedResource.type === 'offer' ? 'provider' : 'requester'} about this resource.
                      </p>
                      
                      <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Hi there! I'm interested in your ${selectedResource.resource_name} listing...`}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSendMessage}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Send Message
                </button>
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Resources;