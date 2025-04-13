
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { OfferProvider } from '@/context/offer';
import TopNavBar from './components/navigation/TopNavBar';
import Index from './pages/Index';
import Auth from './pages/Auth';
import NewOfferPage from './pages/NewOfferPage';
import SavedOffersPage from './pages/SavedOffersPage';
import SavedClientsPage from './pages/SavedClientsPage';
import SavedProductsPage from './pages/SavedProductsPage';
import TemplatesPage from './pages/TemplatesPage';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import CompanyManagementPage from './pages/CompanyManagementPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainSidebar from './components/navigation/MainSidebar';

import './App.css';

// Route tracker to store last offer path
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Store the path when user is in offer creation process
    if (location.pathname === '/' || location.pathname === '/new-offer') {
      localStorage.setItem('lastOfferPath', location.pathname);
    }
  }, [location]);
  
  return null;
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <OfferProvider>
          <BrowserRouter>
            <SidebarProvider>
              <div className="flex flex-col min-h-screen w-full">
                <RouteTracker />
                <Routes>
                  {/* Make Auth the landing page */}
                  <Route path="/" element={<Auth />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <div className="flex flex-col min-h-screen w-full">
                        <TopNavBar />
                        <div className="flex flex-1 w-full">
                          <MainSidebar />
                          <div className="flex-1">
                            <Index />
                          </div>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } />
                  <Route
                    path="/new-offer"
                    element={
                      <ProtectedRoute>
                        <div className="flex flex-col min-h-screen w-full">
                          <TopNavBar />
                          <div className="flex flex-1 w-full">
                            <MainSidebar />
                            <div className="flex-1">
                              <NewOfferPage />
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/saved-offers"
                    element={
                      <ProtectedRoute>
                        <div className="flex flex-col min-h-screen w-full">
                          <TopNavBar />
                          <div className="flex flex-1 w-full">
                            <MainSidebar />
                            <div className="flex-1">
                              <SavedOffersPage />
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/saved-clients"
                    element={
                      <ProtectedRoute>
                        <div className="flex flex-col min-h-screen w-full">
                          <TopNavBar />
                          <div className="flex flex-1 w-full">
                            <MainSidebar />
                            <div className="flex-1">
                              <SavedClientsPage />
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/saved-products"
                    element={
                      <ProtectedRoute>
                        <div className="flex flex-col min-h-screen w-full">
                          <TopNavBar />
                          <div className="flex flex-1 w-full">
                            <MainSidebar />
                            <div className="flex-1">
                              <SavedProductsPage />
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/templates"
                    element={
                      <ProtectedRoute>
                        <div className="flex flex-col min-h-screen w-full">
                          <TopNavBar />
                          <div className="flex flex-1 w-full">
                            <MainSidebar />
                            <div className="flex-1">
                              <TemplatesPage />
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <div className="flex flex-col min-h-screen w-full">
                          <TopNavBar />
                          <div className="flex flex-1 w-full">
                            <MainSidebar />
                            <div className="flex-1">
                              <Settings />
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/company-management"
                    element={
                      <ProtectedRoute>
                        <div className="flex flex-col min-h-screen w-full">
                          <TopNavBar />
                          <div className="flex flex-1 w-full">
                            <MainSidebar />
                            <div className="flex-1">
                              <CompanyManagementPage />
                            </div>
                          </div>
                        </div>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </OfferProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
