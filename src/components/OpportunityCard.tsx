import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onSignUp: (id: number) => void;
  alreadySignedUp?: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  onSignUp, 
  alreadySignedUp = false 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className={`h-2 ${getCategoryColor(opportunity.category)}`}></div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{opportunity.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formatDate(opportunity.date)}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{opportunity.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <User className="h-4 w-4 mr-2" />
          <span>{opportunity.contact}</span>
        </div>
        <p className="text-gray-700 mb-6">{opportunity.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {opportunity.category}
          </span>
          {alreadySignedUp ? (
            <span className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500">
              Already Signed Up
            </span>
          ) : (
            <button
              onClick={() => onSignUp(opportunity.id)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get color based on category
const getCategoryColor = (category: string): string => {
  const categories: Record<string, string> = {
    Education: 'bg-yellow-500',
    Health: 'bg-red-500',
    Environment: 'bg-green-500',
    Technology: 'bg-purple-500',
    Arts: 'bg-pink-500',
    Community: 'bg-orange-500',
  };

  return categories[category] || 'bg-blue-500';
};

export default OpportunityCard;