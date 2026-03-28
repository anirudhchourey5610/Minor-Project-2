import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../lib/api';
import { CommunityTip } from '../types';
import { Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';

const tipCategories = [
  'All Categories',
  'Volunteering Basics',
  'Resource Sharing',
  'Community Building',
  'Safety',
  'Communication',
  'Leadership',
];

const CommunityTips: React.FC = () => {
  const [tips, setTips] = useState<CommunityTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [randomTip, setRandomTip] = useState<CommunityTip | null>(null);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    try {
      setLoading(true);
      
      const { data } = await api.get('/community-tips');
      
      setTips(data || []);
      
      // Set a random tip
      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setRandomTip(data[randomIndex]);
      }
    } catch (error) {
      console.error('Error fetching community tips:', error);
      
      // Use fallback tips for demo
      const fallbackTips = getFallbackTips();
      setTips(fallbackTips);
      
      // Set a random fallback tip
      if (fallbackTips.length > 0) {
        const randomIndex = Math.floor(Math.random() * fallbackTips.length);
        setRandomTip(fallbackTips[randomIndex]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getFallbackTips = (): CommunityTip[] => {
    return [
      {
        id: 1,
        text: "Always confirm the details of a volunteer opportunity before committing to ensure it aligns with your schedule and skills.",
        category: "Volunteering Basics"
      },
      {
        id: 2,
        text: "When sharing resources, provide clear photos and detailed descriptions to ensure recipients know exactly what they're receiving.",
        category: "Resource Sharing"
      },
      {
        id: 3,
        text: "Meet in public places when exchanging resources for the first time with someone you don't know.",
        category: "Safety"
      },
      {
        id: 4,
        text: "Start small with your volunteer commitments and gradually increase as you become more comfortable with the process.",
        category: "Volunteering Basics"
      },
      {
        id: 5,
        text: "Consider organizing community events that bring together volunteers and resource providers to strengthen local connections.",
        category: "Community Building"
      },
      {
        id: 6,
        text: "Always communicate clearly and promptly with both volunteer coordinators and resource recipients to maintain trust.",
        category: "Communication"
      },
      {
        id: 7,
        text: "Document your volunteer hours and impacts - they may be useful for resumes, college applications, or personal growth tracking.",
        category: "Volunteering Basics"
      },
      {
        id: 8,
        text: "Before requesting resources, check if you might be able to find what you need through existing community programs.",
        category: "Resource Sharing"
      },
      {
        id: 9,
        text: "When leading volunteer groups, delegate tasks based on individual strengths and interests for maximum effectiveness.",
        category: "Leadership"
      },
      {
        id: 10,
        text: "Share your positive experiences to inspire others to join volunteer efforts in your community.",
        category: "Community Building"
      }
    ];
  };

  const getNewRandomTip = () => {
    const filteredTips = selectedCategory === 'All Categories' 
      ? tips 
      : tips.filter(tip => tip.category === selectedCategory);
      
    if (filteredTips.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredTips.length);
      setRandomTip(filteredTips[randomIndex]);
      toast.success('New tip loaded!');
    }
  };

  const filteredTips = selectedCategory === 'All Categories' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

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
            <h1 className="text-3xl font-bold text-gray-900">Community Tips</h1>
            <p className="mt-2 text-lg text-gray-600">
              Advice and best practices for effective volunteering and resource sharing.
            </p>
          </div>
          
          {/* Random Tip Section */}
          {randomTip && (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg shadow-md mb-10">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-orange-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-orange-800">Tip of the Day</h3>
                  <div className="mt-2 text-orange-700">
                    <p>{randomTip.text}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      {randomTip.category}
                    </span>
                    <button
                      onClick={getNewRandomTip}
                      className="text-orange-600 hover:text-orange-500 text-sm font-medium"
                    >
                      Show Another Tip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Category Filters */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Tips by Category</h2>
            <div className="flex flex-wrap gap-2">
              {tipCategories.map((category) => (
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
          
          {/* Tips List */}
          {filteredTips.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTips.map((tip) => (
                <div
                  key={tip.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tip.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700">{tip.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No tips available for this category.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityTips;