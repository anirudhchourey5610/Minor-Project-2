import React from 'react';
import { MapPin, Package, User } from 'lucide-react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  onContact: (resource: Resource) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onContact }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className={`h-2 ${resource.type === 'offer' ? 'bg-teal-500' : 'bg-orange-500'}`}></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{resource.resource_name}</h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            resource.type === 'offer' 
              ? 'bg-teal-100 text-teal-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {resource.type === 'offer' ? 'Offering' : 'Requesting'}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{resource.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Package className="h-4 w-4 mr-2" />
          <span>Quantity: {resource.quantity}</span>
        </div>
        
        <p className="text-gray-700 mb-6">{resource.description}</p>
        
        <button
          onClick={() => onContact(resource)}
          className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            resource.type === 'offer' 
              ? 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500' 
              : 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
          } focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          <User className="mr-2 h-4 w-4" />
          Contact {resource.type === 'offer' ? 'Provider' : 'Requester'}
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;