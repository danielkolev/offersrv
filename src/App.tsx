
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SavedOffersPage from "./pages/SavedOffers";
import SavedClientsPage from "./pages/SavedClients";
import SavedProductsPage from "./pages/SavedProductsPage";
import TemplatesPage from "./pages/TemplatesPage";
import Settings from "./pages/Settings";
import NewOfferPage from "./pages/NewOfferPage";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { OfferProvider } from "./context/offer/OfferContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { SidebarProvider } from "./components/ui/sidebar";
import MainSidebar from "./components/navigation/MainSidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <OfferProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SidebarProvider>
                <div className="flex min-h-screen w-full">
                  <MainSidebar />
                  <div className="flex-1">
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <ProtectedRoute>
                            <Index />
                          </ProtectedRoute>
                        }
                      />
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
                      <Route path="/auth" element={<Auth />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </div>
              </SidebarProvider>
            </BrowserRouter>
          </OfferProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
