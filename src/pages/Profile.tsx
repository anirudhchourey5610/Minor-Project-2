import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User } from '../types';
import { Save, Edit2, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    full_name: '',
    location: '',
    skills: '',
    interests: '',
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      const { data } = await api.get('/users');
        
      if (data) {
        const userData: User = {
          id: data._id,
          email: data.email,
          full_name: data.full_name,
          location: data.location,
          skills: data.skills,
          interests: data.interests,
          avatar_url: data.avatar_url,
        };
        
        setProfile(userData);
        setFormData({
          full_name: userData.full_name || '',
          location: userData.location || '',
          skills: userData.skills ? userData.skills.join(', ') : '',
          interests: userData.interests ? userData.interests.join(', ') : '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setLoading(true);
      
      const skills = formData.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill);
        
      const interests = formData.interests
        .split(',')
        .map((interest) => interest.trim())
        .filter((interest) => interest);
      
      await api.put('/users', {
        full_name: formData.full_name,
        location: formData.location,
        skills,
        interests,
      });
        
      if (error) throw error;
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile(); // Refresh data
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-blue-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <UserCircle className="h-32 w-32 text-gray-400" />
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-500 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="City, State, Country"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <textarea
                      id="skills"
                      name="skills"
                      rows={2}
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Teaching, First Aid, Programming, etc. (comma separated)"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                      Interests
                    </label>
                    <textarea
                      id="interests"
                      name="interests"
                      rows={2}
                      value={formData.interests}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Education, Environment, Community Service, etc. (comma separated)"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
                    <UserCircle className="h-32 w-32 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{profile?.full_name}</h3>
                  <p className="text-gray-600">{profile?.email}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="mt-1 text-lg text-gray-900">{profile?.location || 'Not specified'}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                    {profile?.skills && profile.skills.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-lg text-gray-500">No skills specified</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Interests</h4>
                    {profile?.interests && profile.interests.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-lg text-gray-500">No interests specified</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;