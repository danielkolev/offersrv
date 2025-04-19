
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="bg-blue-50 p-3 rounded-2xl">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Offersrv</h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {t.auth.appDescription}
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              {language === 'en' 
                ? "Optimize your business with professional offers. Save time, impress clients, and boost your revenue."
                : "Оптимизирайте бизнеса си с професионални оферти. Спестете време, впечатлете клиентите и спечелете пари за вашия бизнес."}
            </p>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1.5 bg-green-100 rounded-full">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 text-left">{t.auth.feature1}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1.5 bg-green-100 rounded-full">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 text-left">{t.auth.feature2}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1.5 bg-green-100 rounded-full">
                  <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 text-left">{t.auth.feature3}</p>
              </div>
            </div>

            <div className="hidden lg:block pt-4">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-base px-5 py-2 h-10 gap-2" 
                size="default"
              >
                {t.auth.getStarted}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Auth Form */}
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-6 lg:p-8">
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="register">{t.auth.signUp}</TabsTrigger>
                <TabsTrigger value="login">{t.auth.signIn}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="register">
                <AuthForm mode="register" />
              </TabsContent>
              
              <TabsContent value="login">
                <AuthForm mode="login" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden text-center mt-8">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-base px-5 py-2 h-10 gap-2" 
              size="default"
            >
              {t.auth.getStarted}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile optimization - replace jsx styling with inline CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .container {
              padding-left: 16px;
              padding-right: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
