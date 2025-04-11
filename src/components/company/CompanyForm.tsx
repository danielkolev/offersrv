import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/context/AuthContext';

interface CompanyFormProps {
  onSuccess?: (companyId: string) => void;
}

export const CompanyForm = ({ onSuccess }: CompanyFormProps) => {
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
  
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  
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
          .from('company_logos')  // Use the bucket we just created
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
          website,
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.company.create}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">{t.companyInfo.name} *</Label>
            <Input
              id="companyName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.company.namePlaceholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyVat">{t.companyInfo.vatNumber}</Label>
            <Input
              id="companyVat"
              value={vatNumber}
              onChange={(e) => setVatNumber(e.target.value)}
              placeholder={t.company.vatPlaceholder}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyAddress">{t.companyInfo.address}</Label>
            <Input
              id="companyAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={t.company.addressPlaceholder}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyCity">{t.companyInfo.city}</Label>
              <Input
                id="companyCity"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t.company.cityPlaceholder}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyCountry">{t.companyInfo.country}</Label>
              <Input
                id="companyCountry"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder={t.company.countryPlaceholder}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyPhone">{t.companyInfo.phone}</Label>
            <Input
              id="companyPhone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.company.phonePlaceholder}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyEmail">{t.companyInfo.email}</Label>
            <Input
              id="companyEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.company.emailPlaceholder}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">{t.companyInfo.website}</Label>
            <Input
              id="companyWebsite"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder={t.company.websitePlaceholder}
            />
          </div>
          
          <div className="space-y-2">
            <Label>{t.companyInfo.logo}</Label>
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="relative h-20 w-auto">
                  <img
                    src={logoPreview}
                    alt={t.companyInfo.logo}
                    className="h-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={() => {
                      setLogo(null);
                      setLogoPreview(null);
                    }}
                  >
                    X
                  </Button>
                </div>
              )}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('logoInput')?.click()}
                  className="flex items-center gap-2"
                >
                  <UploadCloud size={16} />
                  {t.companyInfo.uploadLogo}
                </Button>
                <input
                  id="logoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? t.common.processing : t.company.createButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;
