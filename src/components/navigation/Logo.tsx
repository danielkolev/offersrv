
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <FileText className="h-5 w-5" />
      <span className="font-semibold text-lg hidden md:inline-flex">
        Offersrv
      </span>
    </Link>
  );
};

export default Logo;
