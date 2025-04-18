
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
  const { t } = useLanguage();
  
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <FileText className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Offersrv</h1>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {t.auth.appDescription || 'Create professional business offers quickly and easily'}
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl">
              Streamline your business with professional offers. Save time, impress clients, and grow your business.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{t.auth.feature1 || 'Professional templates and customization'}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{t.auth.feature2 || 'Manage clients and products efficiently'}</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-1 bg-green-100 rounded-full">
                  <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{t.auth.feature3 || 'Generate and track offers seamlessly'}</p>
              </div>
            </div>

            <div className="hidden lg:block">
              <Button className="text-lg px-8 py-6 h-auto gap-2" size="lg" onClick={() => {}}>
                {t.auth.getStarted || 'Get Started Free'}
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
          
          {/* Auth Form */}
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl p-6">
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
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
