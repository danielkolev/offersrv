
import { useState, useRef } from 'react';
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isSubmitting = useRef(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t.company.error,
          description: "File is too large. Maximum size is 5MB.",
          variant: 'destructive'
        });
        return;
      }
      
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.onerror = () => {
        toast({
          title: t.company.error,
          description: "Failed to read file. Please try another image.",
          variant: 'destructive'
        });
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
    
    // Prevent double submission
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    
    if (!name) {
      toast({
        title: t.company.error,
        description: t.company.nameRequired,
        variant: 'destructive'
      });
      isSubmitting.current = false;
      return;
    }
    
    if (!user) {
      toast({
        title: t.company.error,
        description: "You must be logged in to create a company",
        variant: 'destructive'
      });
      isSubmitting.current = false;
      return;
    }
    
    setLoading(true);
    setSubmitError(null);
    
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
      
      // Reset form
      setName('');
      setVatNumber('');
      setAddress('');
      setCity('');
      setCountry('');
      setPhone('');
      setEmail('');
      setWebsite('');
      setLogo(null);
      setLogoPreview(null);
      
      if (onSuccess && company) {
        onSuccess(company.id);
      }
    } catch (error: any) {
      console.error('Error creating company:', error);
      setSubmitError(error.message);
      toast({
        title: t.company.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
      isSubmitting.current = false;
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
      loading,
      submitError
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
