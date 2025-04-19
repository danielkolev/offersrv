
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export const useCompanyData = (companyId: string | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateCompanyInfo } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();
  const fetchedRef = useRef(false);
  const previousCompanyId = useRef<string | null>(null);
  const isMountedRef = useRef(true);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 3;

  // Устанавливаем isMounted в false при размонтировании компонента
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Очищаем таймер повторных попыток при размонтировании
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  const fetchCompanyData = useCallback(async (id: string) => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("useCompanyData: Fetching company data for ID:", id);
      
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      // Проверяем, что компонент все еще смонтирован
      if (!isMountedRef.current) return;
      
      if (data) {
        console.log("useCompanyData: Company data loaded successfully");
        
        // Обновляем контекст оферты данными компании
        updateCompanyInfo({
          id: data.id,
          name: data.name || '',
          nameEn: data.name_en || '',
          vatNumber: data.vat_number || '',
          eikNumber: data.company_id || '', // Updated to use company_id
          address: data.address || '',
          addressEn: data.address_en || '',
          city: data.city || '',
          cityEn: data.city_en || '',
          country: data.country || '',
          countryEn: data.country_en || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          logo_url: data.logo_url || null,
          logo_url_en: data.logo_url_en || null,
          slogan: data.slogan || '',
          slogan_en: data.slogan_en || '',
          conclusion_text: data.conclusion_text || '',
          conclusion_text_en: data.conclusion_text_en || ''
        });
        
        // Отмечаем, что данные были загружены
        fetchedRef.current = true;
        retryCountRef.current = 0; // Сбрасываем счетчик попыток
      }
    } catch (err: any) {
      // Проверяем, что компонент все еще смонтирован
      if (!isMountedRef.current) return;
      
      console.error('Error fetching company data:', err);
      setError(err.message);
      
      // Проверяем, была ли ошибка связана с сетью
      const isNetworkError = err.message?.includes('fetch') || 
                             err.message?.includes('network') ||
                             err.message?.includes('failed');
      
      // Пробуем повторно загрузить данные в случае сетевой ошибки
      if (isNetworkError && retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        const retryDelay = Math.min(1000 * Math.pow(2, retryCountRef.current), 10000); // Экспоненциальная задержка с ограничением
        
        console.log(`useCompanyData: Network error, retry ${retryCountRef.current}/${MAX_RETRIES} in ${retryDelay}ms`);
        
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        
        retryTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current) {
            fetchCompanyData(id);
          }
        }, retryDelay);
      } else if (retryCountRef.current >= MAX_RETRIES) {
        // Показываем сообщение об ошибке только если исчерпали все попытки
        toast({
          title: t.common.error,
          description: `Error loading company data: ${err.message}`,
          variant: 'destructive'
        });
      }
    } finally {
      // Проверяем, что компонент все еще смонтирован
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [updateCompanyInfo, toast, t.common.error]);

  useEffect(() => {
    // Сбрасываем статус загрузки при изменении ID компании
    if (companyId !== previousCompanyId.current) {
      fetchedRef.current = false;
      previousCompanyId.current = companyId;
      retryCountRef.current = 0;
      
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }
    
    if (!companyId || fetchedRef.current) return;
    
    fetchCompanyData(companyId);
  }, [companyId, fetchCompanyData]);

  // Метод для ручного обновления данных
  const refetch = useCallback(() => {
    if (companyId) {
      fetchedRef.current = false;
      retryCountRef.current = 0;
      fetchCompanyData(companyId);
    }
  }, [companyId, fetchCompanyData]);

  return { 
    isLoading, 
    error, 
    refetch, 
    fetchCompanyData 
  };
};
