
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { OfferProvider } from "./context/offer/OfferContext";
import "./App.css";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import SavedOffersPage from "./pages/SavedOffersPage";
import SavedClientsPage from "./pages/SavedClientsPage";
import SavedProductsPage from "./pages/SavedProductsPage";
import TemplatesPage from "./pages/TemplatesPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainSidebar from "./components/navigation/MainSidebar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <OfferProvider>
      <Router>
        <div className="flex min-h-screen w-full relative">
          <MainSidebar />
          <main className="flex-1 w-full p-6 ml-0 md:ml-[3rem]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/offer" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </OfferProvider>
  );
}

export default App;
