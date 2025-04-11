import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadCloud, Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Company } from '@/types/company';

interface CompanyInfoProps {
  companyId: string;
  onUpdate?: () => void;
}

const CompanyInfoSettings = ({ companyId, onUpdate }: CompanyInfoProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Company data with language specific fields
  const [company, setCompany] = useState<Company & {
    name_en?: string;
    address_en?: string;
    city_en?: string;
    country_en?: string;
  }>({
    id: '',
    name: '',
    vat_number: '',
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
    country_en: ''
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
          address: data.address || '',
          city: data.city || '',
          country: data.country || '',
          phone: data.phone || '',
          email: data.email || '',
          website: data.website || '',
          logo_url: data.logo_url,
          name_en: data.name_en || '',
          address_en: data.address_en || '',
          city_en: data.city_en || '',
          country_en: data.country_en || ''
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

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: t.common.error,
          description: "File is too large. Maximum size is 5MB.",
          variant: 'destructive'
        });
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Upload logo
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('company_logos')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('company_logos')
          .getPublicUrl(filePath);
          
        // Update company with new logo URL
        setCompany({
          ...company,
          logo_url: publicUrl
        });
        
        toast({
          title: t.common.success,
          description: "Logo uploaded successfully"
        });
      } catch (error: any) {
        console.error('Error uploading logo:', error);
        toast({
          title: t.common.error,
          description: error.message,
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveLogo = async () => {
    try {
      setIsLoading(true);
      
      // Update organization record without logo
      const { error } = await supabase
        .from('organizations')
        .update({ logo_url: null })
        .eq('id', companyId);
        
      if (error) throw error;
      
      // Update local state
      setCompany({
        ...company,
        logo_url: null
      });
      
      toast({
        title: t.common.success,
        description: "Logo removed successfully"
      });
    } catch (error: any) {
      console.error('Error removing logo:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Update organization record
      const { error } = await supabase
        .from('organizations')
        .update({
          name: company.name,
          vat_number: company.vat_number,
          address: company.address,
          city: company.city,
          country: company.country,
          phone: company.phone,
          email: company.email,
          website: company.website,
          logo_url: company.logo_url,
          name_en: company.name_en,
          address_en: company.address_en,
          city_en: company.city_en,
          country_en: company.country_en
        })
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
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t.companyInfo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">{t.common.loading}</div>
        ) : (
          <>
            <Tabs defaultValue="bulgarian">
              <div className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bulgarian">Български</TabsTrigger>
                  <TabsTrigger value="english">English</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="bulgarian" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t.companyInfo.name} *</Label>
                    <Input
                      id="companyName"
                      value={company.name}
                      onChange={(e) => setCompany({...company, name: e.target.value})}
                      placeholder={t.company.namePlaceholder}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyVat">{t.companyInfo.vatNumber}</Label>
                    <Input
                      id="companyVat"
                      value={company.vat_number || ''}
                      onChange={(e) => setCompany({...company, vat_number: e.target.value})}
                      placeholder={t.company.vatPlaceholder}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">{t.companyInfo.address}</Label>
                    <Input
                      id="companyAddress"
                      value={company.address || ''}
                      onChange={(e) => setCompany({...company, address: e.target.value})}
                      placeholder={t.company.addressPlaceholder}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyCity">{t.companyInfo.city}</Label>
                    <Input
                      id="companyCity"
                      value={company.city || ''}
                      onChange={(e) => setCompany({...company, city: e.target.value})}
                      placeholder={t.company.cityPlaceholder}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyCountry">{t.companyInfo.country}</Label>
                    <Input
                      id="companyCountry"
                      value={company.country || ''}
                      onChange={(e) => setCompany({...company, country: e.target.value})}
                      placeholder={t.company.countryPlaceholder}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="english" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyNameEn">{t.companyInfo.name} (English) *</Label>
                    <Input
                      id="companyNameEn"
                      value={company.name_en || ''}
                      onChange={(e) => setCompany({...company, name_en: e.target.value})}
                      placeholder="Enter company name in English"
                    />
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label htmlFor="companyAddressEn">{t.companyInfo.address} (English)</Label>
                    <Input
                      id="companyAddressEn"
                      value={company.address_en || ''}
                      onChange={(e) => setCompany({...company, address_en: e.target.value})}
                      placeholder="Enter company address in English"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyCityEn">{t.companyInfo.city} (English)</Label>
                    <Input
                      id="companyCityEn"
                      value={company.city_en || ''}
                      onChange={(e) => setCompany({...company, city_en: e.target.value})}
                      placeholder="Enter city in English"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyCountryEn">{t.companyInfo.country} (English)</Label>
                    <Input
                      id="companyCountryEn"
                      value={company.country_en || ''}
                      onChange={(e) => setCompany({...company, country_en: e.target.value})}
                      placeholder="Enter country in English"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="companyPhone">{t.companyInfo.phone}</Label>
                <Input
                  id="companyPhone"
                  value={company.phone || ''}
                  onChange={(e) => setCompany({...company, phone: e.target.value})}
                  placeholder={t.company.phonePlaceholder}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyEmail">{t.companyInfo.email}</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={company.email || ''}
                  onChange={(e) => setCompany({...company, email: e.target.value})}
                  placeholder={t.company.emailPlaceholder}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyWebsite">{t.companyInfo.website}</Label>
                <Input
                  id="companyWebsite"
                  value={company.website || ''}
                  onChange={(e) => setCompany({...company, website: e.target.value})}
                  placeholder={t.company.websitePlaceholder}
                />
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <Label>{t.companyInfo.logo}</Label>
              <div className="flex items-center gap-4">
                {company.logo_url ? (
                  <div className="relative h-20 w-auto">
                    <img
                      src={company.logo_url}
                      alt={t.companyInfo.logo}
                      className="h-full object-contain"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2"
                      onClick={handleRemoveLogo}
                      disabled={isLoading}
                    >
                      X
                    </Button>
                  </div>
                ) : null}
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogoClick}
                    className="flex items-center gap-2"
                    disabled={isLoading}
                  >
                    <UploadCloud size={16} />
                    {t.companyInfo.uploadLogo}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                type="button" 
                className="w-full" 
                onClick={handleSave}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? t.common.processing : t.company.updateButton}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyInfoSettings;
