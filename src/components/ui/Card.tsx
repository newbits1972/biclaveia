import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
