
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

interface UseCompanyFormProps {
  onSuccess?: (companyId: string) => void;
}

export const useCompanyForm = ({ onSuccess }: UseCompanyFormProps) => {
  const [name, setName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearLogo = () => {
    setLogo(null);
    setLogoPreview(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast({
        title: t.company.error,
        description: t.company.nameRequired,
        variant: 'destructive'
      });
      return;
    }
    
    if (!user) {
      toast({
        title: t.company.error,
        description: "You must be logged in to create a company",
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    try {
      // Upload logo if selected
      let logoUrl = null;
      if (logo) {
        const fileExt = logo.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('company_logos')
          .upload(filePath, logo);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('company_logos')
          .getPublicUrl(filePath);
          
        logoUrl = publicUrl;
      }
      
      // Create company record
      const { data: company, error: companyError } = await supabase
        .from('organizations')
        .insert({
          name,
          vat_number: vatNumber,
          address,
          // Note: city and country fields are not included as they don't exist in the organizations table
          phone,
          email,
          // website field is removed as it doesn't exist in the organizations table
          logo_url: logoUrl,
          owner_id: user.id
        })
        .select('id')
        .single();
        
      if (companyError) throw companyError;
      
      // Create organization member record for the creator (as admin)
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          user_id: user.id,
          organization_id: company.id,
          role: 'admin'
        });
        
      if (memberError) throw memberError;
      
      toast({
        title: t.company.success,
        description: t.company.createdSuccessfully
      });
      
      if (onSuccess && company) {
        onSuccess(company.id);
      }
    } catch (error: any) {
      console.error('Error creating company:', error);
      toast({
        title: t.company.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData: {
      name,
      vatNumber,
      address,
      city,
      country,
      phone,
      email,
      website,
      logo,
      logoPreview,
      loading
    },
    setters: {
      setName,
      setVatNumber,
      setAddress,
      setCity,
      setCountry,
      setPhone,
      setEmail,
      setWebsite
    },
    handleLogoChange,
    clearLogo,
    handleSubmit
  };
};
