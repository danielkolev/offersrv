
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
import DraftIndicator from './components/offer-draft/DraftIndicator';

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

// Component that determines if draft indicator should be shown
const DraftIndicatorWrapper = () => {
  const location = useLocation();
  
  // Hide the draft indicator on the pages where the offer is being edited
  if (location.pathname === '/new-offer') {
    return null;
  }
  
  return <DraftIndicator />;
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
                <TopNavBar />
                <div className="flex flex-1 w-full">
                  <MainSidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route
                        path="/new-offer"
                        element={
                          <ProtectedRoute>
                            <NewOfferPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/saved-offers"
                        element={
                          <ProtectedRoute>
                            <SavedOffersPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/saved-clients"
                        element={
                          <ProtectedRoute>
                            <SavedClientsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/saved-products"
                        element={
                          <ProtectedRoute>
                            <SavedProductsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/templates"
                        element={
                          <ProtectedRoute>
                            <TemplatesPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <ProtectedRoute>
                            <Settings />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/company-management"
                        element={
                          <ProtectedRoute>
                            <CompanyManagementPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                    <DraftIndicatorWrapper />
                  </div>
                </div>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </OfferProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
