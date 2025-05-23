
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';

interface UseCompanyInfoSettingsProps {
  companyId: string;
  t: Translations;
  onUpdate?: () => void;
}

export const useCompanyInfoSettings = ({ companyId, t, onUpdate }: UseCompanyInfoSettingsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Company data with language specific fields
  const [company, setCompany] = useState<Company>({
    id: '',
    name: '',
    vat_number: '',
    company_id: '', // Using company_id instead of eik_number
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    logo_url: null,
    name_en: '',
    address_en: '',
    city_en: '',
    country_en: '',
    slogan: '',
    slogan_en: '',
    conclusion_text: '',
    conclusion_text_en: ''
  });

  // Load company data when component mounts
  useEffect(() => {
    if (companyId) {
      loadCompanyData();
    }
  }, [companyId]);

  const loadCompanyData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', companyId)
        .single();

      if (error) throw error;
      
      if (data) {
        setCompany({
          id: data.id,
          name: data.name || '',
          vat_number: data.vat_number || '',
          company_id: data.company_id || '',
          address: data.address || '',
          city: data.city || '',
          country: data.country || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          logo_url: data.logo_url,
          logo_url_en: data.logo_url_en,
          name_en: data.name_en || '',
          address_en: data.address_en || '',
          city_en: data.city_en || '',
          country_en: data.country_en || '',
          slogan: data.slogan || '',
          slogan_en: data.slogan_en || '',
          conclusion_text: data.conclusion_text || '',
          conclusion_text_en: data.conclusion_text_en || ''
        });
      }
    } catch (error: any) {
      console.error('Error loading company data:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Prepare the update data, making sure we only include valid fields
      const updateData: any = {
        name: company.name,
        vat_number: company.vat_number,
        company_id: company.company_id,
        address: company.address,
        city: company.city,
        country: company.country,
        phone: company.phone,
        email: company.email,
        website: company.website,
        logo_url: company.logo_url,
        logo_url_en: company.logo_url_en,
        name_en: company.name_en,
        address_en: company.address_en,
        city_en: company.city_en,
        country_en: company.country_en,
        slogan: company.slogan,
        slogan_en: company.slogan_en,
        conclusion_text: company.conclusion_text,
        conclusion_text_en: company.conclusion_text_en
      };
      
      // Update organization record
      const { error } = await supabase
        .from('organizations')
        .update(updateData)
        .eq('id', companyId);
        
      if (error) throw error;
      
      toast({
        title: t.common.success,
        description: "Company information updated successfully"
      });
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (error: any) {
      console.error('Error updating company information:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateCompanyField = (field: keyof Company, value: string) => {
    setCompany(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    company,
    setCompany,
    isLoading,
    isSaving,
    handleSave,
    handleUpdateCompanyField
  };
};
