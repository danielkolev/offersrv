
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <MainSidebar />
        <div className="flex flex-col min-h-screen flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
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
        </div>
      </div>
    </Router>
  );
}

export default App;
