import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  to, 
  variant = 'primary', 
  className = '',
  type = 'button'
}) => {
  const baseClasses = "px-8 py-3 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105";
  const primaryClasses = "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-lg hover:shadow-xl";
  const secondaryClasses = "bg-white text-brand-purple border border-brand-purple hover:bg-brand-purple hover:text-white";

  const appliedClasses = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={appliedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={appliedClasses}>
      {children}
    </button>
  );
};

export default Button;
