
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/components/ui/sidebar';
import { OfferProvider } from '@/context/offer';
import TopNavBar from './components/navigation/TopNavBar';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Login from './pages/Login';
import NewOfferPage from './pages/NewOfferPage';
import SavedOffersPage from './pages/SavedOffersPage';
import SavedClientsPage from './pages/SavedClientsPage';
import SavedProductsPage from './pages/SavedProductsPage';
import TemplatesPage from './pages/TemplatesPage';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import CompanyManagementPage from './pages/CompanyManagementPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import MainSidebar from './components/navigation/MainSidebar';
import LandingPage from './pages/LandingPage';

// Административни страници
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import OffersManagement from './pages/admin/OffersManagement';

import './App.css';

// Route tracker to store last offer path
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Store the path when user is in offer creation process
    if (location.pathname === '/dashboard' || location.pathname === '/new-offer') {
      localStorage.setItem('lastOfferPath', location.pathname);
    }
  }, [location]);
  
  return null;
};

// Shared layout for protected routes
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen w-full">
        <TopNavBar />
        <div className="flex flex-1 w-full">
          <div className="hidden md:block">
            <MainSidebar />
          </div>
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
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
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UsersManagement />} />
                    <Route path="offers" element={<OffersManagement />} />
                    <Route path="clients" element={<div>Клиенти административна страница</div>} />
                    <Route path="settings" element={<div>Настройки административна страница</div>} />
                  </Route>
                  
                  {/* Protected routes with shared layout */}
                  <Route path="/dashboard" element={
                    <ProtectedLayout>
                      <Dashboard />
                    </ProtectedLayout>
                  } />
                  <Route path="/new-offer" element={
                    <ProtectedLayout>
                      <NewOfferPage />
                    </ProtectedLayout>
                  } />
                  <Route path="/saved-offers" element={
                    <ProtectedLayout>
                      <SavedOffersPage />
                    </ProtectedLayout>
                  } />
                  <Route path="/saved-clients" element={
                    <ProtectedLayout>
                      <SavedClientsPage />
                    </ProtectedLayout>
                  } />
                  <Route path="/saved-products" element={
                    <ProtectedLayout>
                      <SavedProductsPage />
                    </ProtectedLayout>
                  } />
                  <Route path="/templates" element={
                    <ProtectedLayout>
                      <TemplatesPage />
                    </ProtectedLayout>
                  } />
                  <Route path="/settings" element={
                    <ProtectedLayout>
                      <Settings />
                    </ProtectedLayout>
                  } />
                  <Route path="/company-management" element={
                    <ProtectedLayout>
                      <CompanyManagementPage />
                    </ProtectedLayout>
                  } />
                  <Route path="/analytics" element={
                    <ProtectedLayout>
                      <div>Analytics Page</div>
                    </ProtectedLayout>
                  } />
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
