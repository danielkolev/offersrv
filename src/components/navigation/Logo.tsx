
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
      <span className="font-bold text-xl hidden md:inline-block">Offersrv</span>
    </Link>
  );
};

export default Logo;
