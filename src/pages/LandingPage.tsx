
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useEffect(() => {
    if (user) {
      // If user is already logged in, redirect to dashboard
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Landing page content */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-offer-blue">
            {t.auth.appTitle || 'OfferForge'}
          </h1>
          <p className="text-xl text-offer-gray">
            {t.auth.appDescription || 'Create professional business offers quickly and easily.'}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-offer-blue/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-offer-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg">{t.auth.feature1 || 'Professional templates'}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-offer-blue/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-offer-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg">{t.auth.feature2 || 'Client management'}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-offer-blue/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-offer-blue" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg">{t.auth.feature3 || 'Product catalog'}</p>
            </div>
          </div>
        </div>
        
        {/* Auth form */}
        <div className="w-full max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">{t.auth.signIn}</TabsTrigger>
              <TabsTrigger value="register">{t.auth.signUp}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <AuthForm mode="login" />
            </TabsContent>
            
            <TabsContent value="register">
              <AuthForm mode="register" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
