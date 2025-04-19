
import React from 'react';

interface CustomFooterTextProps {
  text: string;
}

const CustomFooterText: React.FC<CustomFooterTextProps> = ({ text }) => {
  if (!text) return null;
  
  return (
    <div className="mb-6 print-visible border-t pt-4 mt-4">
      <div className="whitespace-pre-line text-sm text-gray-700">
        {text}
      </div>
    </div>
  );
};

export default CustomFooterText;
