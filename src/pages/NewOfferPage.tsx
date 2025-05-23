
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import SimpleOfferAccordion from '@/components/wizard/SimpleOfferAccordion';
import { useCompanySelection } from '@/hooks/useCompanySelection';
import { useOfferInitialization } from '@/hooks/useOfferInitialization';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const NewOfferPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Проверяем, нужно ли загрузить черновик из состояния навигации
  const shouldLoadDraft = location.state?.loadDraft === true;
  const draftId = location.state?.draftId;
  
  // Используем оптимизированные хуки для выбора компании и инициализации оферты
  const { 
    selectedCompanyId, 
    isLoading: isLoadingCompany, 
    error: companyError,
    setCompanyId
  } = useCompanySelection();
  
  const { 
    isInitializing: isInitializingOffer,
    initError: offerInitError
  } = useOfferInitialization(shouldLoadDraft, draftId);
  
  // Общее состояние загрузки и ошибок
  const isLoading = isLoadingCompany || isInitializingOffer;
  const hasError = !!companyError || !!offerInitError;

  // Load the user's company (if there's only one)
  useEffect(() => {
    const loadUserCompany = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('id')
          .eq('owner_id', user.id)
          .limit(1)
          .single();
          
        if (error) {
          if (error.code !== 'PGRST116') { // Not the "no rows returned" error
            console.error('Error loading company:', error);
          }
          return;
        }
        
        if (data) {
          // Store the company ID in localStorage
          localStorage.setItem('selectedCompanyId', data.id);
          // Update the company selection in the hook
          setCompanyId(data.id);
        }
      } catch (err: any) {
        console.error('Error in loadUserCompany:', err);
        toast({
          title: t.common.error,
          description: err.message,
          variant: 'destructive'
        });
      }
    };
    
    loadUserCompany();
  }, [user, setCompanyId, toast, t.common.error]);

  // Состояние для неавторизованных пользователей
  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
          <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {t.offer.createOffer}
        </h1>
        
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">{t.common.loading}...</span>
          </div>
        )}
      </div>
      
      <SimpleOfferAccordion 
        isLoading={isLoading}
        hasError={hasError}
        selectedCompanyId={selectedCompanyId}
      />
    </div>
  );
};

export default NewOfferPage;
