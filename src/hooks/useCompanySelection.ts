
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export const useCompanySelection = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  // Кеширование ID компании в памяти, чтобы избежать повторных запросов
  const [companyIdCached, setCompanyIdCached] = useState(false);

  // Получаем ID компании из localStorage или из базы данных
  const initializeCompanyId = useCallback(async () => {
    if (companyIdCached || !user) return;
    
    const storedCompanyId = localStorage.getItem('selectedCompanyId');
    
    if (storedCompanyId) {
      console.log("useCompanySelection: Using company from localStorage:", storedCompanyId);
      setSelectedCompanyId(storedCompanyId);
      setCompanyIdCached(true);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Получаем компании, в которых пользователь является членом
      console.log("useCompanySelection: Fetching user's companies");
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id);
        
      if (memberError) throw memberError;
      
      // Если у пользователя есть компании, выбираем первую как стандартную
      if (memberData && memberData.length > 0) {
        const defaultCompanyId = memberData[0].organization_id;
        console.log("useCompanySelection: Found user's owned company:", defaultCompanyId);
        setSelectedCompanyId(defaultCompanyId);
        localStorage.setItem('selectedCompanyId', defaultCompanyId);
        setCompanyIdCached(true);
      } else {
        console.log("useCompanySelection: User has no companies");
        setError("No companies found");
      }
    } catch (error: any) {
      console.error('useCompanySelection: Error fetching companies:', error);
      setError(error.message);
      
      // Повторная попытка через 2 секунды при сетевой ошибке
      if (error.message?.includes('fetch') || error.message?.includes('network')) {
        setTimeout(() => {
          setCompanyIdCached(false); // Разрешить повторную попытку
        }, 2000);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user, companyIdCached]);

  // Сброс кеша ID компании
  const resetCompanySelection = useCallback(() => {
    setCompanyIdCached(false);
    setSelectedCompanyId(null);
    localStorage.removeItem('selectedCompanyId');
  }, []);

  // Устанавливаем ID компании
  const setCompanyId = useCallback((id: string | null) => {
    if (id) {
      localStorage.setItem('selectedCompanyId', id);
      setSelectedCompanyId(id);
      setCompanyIdCached(true);
    } else {
      localStorage.removeItem('selectedCompanyId');
      setSelectedCompanyId(null);
      setCompanyIdCached(false);
    }
  }, []);

  // Инициализируем компанию при монтировании компонента
  useEffect(() => {
    initializeCompanyId();
  }, [initializeCompanyId]);

  return {
    selectedCompanyId,
    isLoading,
    error,
    setCompanyId,
    resetCompanySelection,
    refreshCompanySelection: () => setCompanyIdCached(false)
  };
};
