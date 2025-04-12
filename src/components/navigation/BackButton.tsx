
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  label?: string;
  to?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label, to }) => {
  const navigate = useNavigate();
  const lastOfferPath = localStorage.getItem('lastOfferPath') || '/new-offer';
  
  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(lastOfferPath);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default BackButton;
