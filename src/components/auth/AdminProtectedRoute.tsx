
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Always define toast messages first, outside of any conditional logic
  const notAuthenticatedMessage = React.useMemo(() => ({
    title: t.auth.notAuthenticated,
    variant: "destructive" as const,
  }), [t.auth.notAuthenticated]);

  const notAdminMessage = React.useMemo(() => ({
    title: "Нямате административни права",
    description: "Трябва да имате администраторски достъп, за да видите тази страница",
    variant: "destructive" as const,
  }), []);

  // Handle authentication checks
  React.useEffect(() => {
    if (!user && !loading) {
      toast(notAuthenticatedMessage);
    } else if (user && !isAdmin && !loading) {
      toast(notAdminMessage);
    }
  }, [user, isAdmin, loading, toast, notAuthenticatedMessage, notAdminMessage]);

  // Показваме зареждащо състояние, докато определяме удостоверяването
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Проверяваме дали потребителят е вписан
  if (!user) {
    // Запазваме текущото местоположение, до което потребителят се опитваше да достъпи
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Проверяваме дали потребителят е администратор
  if (!isAdmin) {
    // Пренасочваме към таблото
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
