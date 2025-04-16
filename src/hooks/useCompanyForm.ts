
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UseCompanyFormProps {
  onSuccess?: (companyId: string) => void;
}

export const useCompanyForm = ({ onSuccess }: UseCompanyFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Form state
  const [name, setName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [eikNumber, setEikNumber] = useState(''); // Add EIK number state
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
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
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: t.common.error,
        description: t.company.nameRequired,
        variant: 'destructive',
      });
      return;
    }
    
    if (!user) {
      toast({
        title: t.common.error,
        description: 'User not authenticated',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Create the organization
      const { data, error } = await supabase
        .from('organizations')
        .insert({
          name,
          vat_number: vatNumber,
          eik_number: eikNumber, // Add EIK number to the database
          address,
          city,
          country,
          phone,
          email,
          website,
          owner_id: user.id,
        })
        .select();
      
      if (error) throw error;
      
      const companyId = data[0].id;
      
      // Upload logo if it exists
      if (logo) {
        const fileExt = logo.name.split('.').pop();
        const fileName = `${companyId}.${fileExt}`;
        
        const { error: storageError } = await supabase.storage
          .from('logos')
          .upload(fileName, logo);
          
        if (storageError) {
          console.error('Error uploading logo:', storageError);
          // Continue anyway, the company was created successfully
        } else {
          // Get the URL of the uploaded logo
          const { data: urlData } = supabase.storage
            .from('logos')
            .getPublicUrl(fileName);
            
          // Update the company with the logo URL
          await supabase
            .from('organizations')
            .update({ logo_url: urlData.publicUrl })
            .eq('id', companyId);
        }
      }
      
      toast({
        title: t.common.success,
        description: t.company.createdSuccessfully || 'Company created successfully',
      });
      
      // Call the onSuccess callback with the new company ID
      if (onSuccess) {
        onSuccess(companyId);
      }
      
      // Reset the form
      setName('');
      setVatNumber('');
      setEikNumber('');
      setAddress('');
      setCity('');
      setCountry('');
      setPhone('');
      setEmail('');
      setWebsite('');
      clearLogo();
      
    } catch (error: any) {
      console.error('Error creating company:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return {
    formData: {
      name,
      vatNumber,
      eikNumber,
      address,
      city,
      country,
      phone,
      email,
      website,
      logo,
      logoPreview,
      loading,
    },
    setters: {
      setName,
      setVatNumber,
      setEikNumber,
      setAddress,
      setCity,
      setCountry,
      setPhone,
      setEmail,
      setWebsite,
    },
    handleLogoChange,
    clearLogo,
    handleSubmit,
  };
};
