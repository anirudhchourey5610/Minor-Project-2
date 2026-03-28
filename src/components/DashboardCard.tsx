import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  icon, 
  children,
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 p-2 rounded-md">
            {icon}
          </div>
          <h2 className="ml-3 text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;