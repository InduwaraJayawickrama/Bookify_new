import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button 
      className={`px-4 py-2 rounded-md transition-colors ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;