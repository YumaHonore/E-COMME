import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  as: Component = 'button',
  ...props 
}) => {
  const baseClasses = "px-6 py-3 font-medium transition-colors";
  
  const variantClasses = {
    primary: "bg-primary text-white hover:bg-opacity-90",
    secondary: "border border-primary hover:bg-secondary",
    accent: "bg-accent text-white hover:bg-opacity-90",
  };
  
  return (
    <Component 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;