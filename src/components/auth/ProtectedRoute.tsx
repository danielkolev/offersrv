
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Show loading state if still determining authentication
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    // Use effect to show toast notification after rendering to avoid state updates during render
    useEffect(() => {
      toast({
        title: t.auth.notAuthenticated,
        variant: "destructive",
      });
    }, []);
    
    // Save the current location user was trying to access
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
