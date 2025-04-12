
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
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

import './App.css';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
