
import React, { useEffect } from 'react';
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

  // Показваме зареждащо състояние, докато определяме удостоверяването
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Проверяваме дали потребителят е вписан
  if (!user) {
    useEffect(() => {
      toast({
        title: t.auth.notAuthenticated,
        variant: "destructive",
      });
    }, []);
    
    // Запазваме текущото местоположение, до което потребителят се опитваше да достъпи
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Проверяваме дали потребителят е администратор
  if (!isAdmin) {
    useEffect(() => {
      toast({
        title: "Нямате административни права",
        description: "Трябва да имате администраторски достъп, за да видите тази страница",
        variant: "destructive",
      });
    }, []);
    
    // Пренасочваме към таблото
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
