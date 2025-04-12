
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  // Get the path the user was trying to access
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      // Navigate to the page the user was trying to access, or home
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-offer-blue">{t.auth.welcomeTitle}</h1>
        <p className="text-offer-gray mt-2">{t.auth.welcomeSubtitle}</p>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
