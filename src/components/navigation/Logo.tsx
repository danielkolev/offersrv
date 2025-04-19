import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
const Logo = () => {
  return <Link to="/" className="flex items-center gap-2">
      
      <span className="flex items-center gap-2 font-bold text-xl hidden md:inline-flex">
        <FileText className="h-5 w-5" />
        Offersrv
      </span>
    </Link>;
};
export default Logo;