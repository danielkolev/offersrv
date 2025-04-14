import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTemplateManagement } from '@/hooks/use-template-management';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useOfferActions = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { resetToDefaultTemplate } = useTemplateManagement();

  const createNewOffer = useCallback(() => {
    // Get default template
    const defaultTemplate = resetToDefaultTemplate();
    
    // Navigate to create offer page with template
    if (defaultTemplate) {
      router.push(`/create-offer?template=${defaultTemplate.id}`);
    } else {
      router.push('/create-offer');
    }
  }, [router, resetToDefaultTemplate]);

  const saveOffer = useCallback(async (offerData: any, isTemplate: boolean = false) => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive',
      });
      return false;
    }

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('saved_offers')
        .insert([
          { 
            ...offerData, 
            creator_id: user.id,
            is_template: isTemplate
          },
        ])
        .select();

      if (error) {
        console.error('Error saving offer:', error);
        toast({
          title: t.common.error,
          description: t.offer.saveFailed,
          variant: 'destructive',
        });
        return false;
      }

      toast({
        title: t.common.success,
        description: t.offer.savedSuccessfully,
      });
      return true;
    } catch (error) {
      console.error('Unexpected error saving offer:', error);
      toast({
        title: t.common.error,
        description: t.offer.saveFailed,
        variant: 'destructive',
      });
      return false;
    }
  }, [user, toast, t]);

  return {
    createNewOffer,
    saveOffer
  };
};
