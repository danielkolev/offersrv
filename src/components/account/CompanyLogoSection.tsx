
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Translations } from '@/types/language';

interface CompanyLogoSectionProps {
  companyId: string;
  logoUrl: string | null;
  isLoading: boolean;
  t: Translations;
  onLogoChange: (url: string | null) => void;
}

const CompanyLogoSection = ({ 
  companyId, 
  logoUrl, 
  isLoading, 
  t, 
  onLogoChange 
}: CompanyLogoSectionProps) => {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    fileInputRef.current?.click();
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
          
        // Update with new logo URL
        onLogoChange(publicUrl);
        
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
      }
    }
  };

  const handleRemoveLogo = async () => {
    try {
      // Update organization record without logo
      const { error } = await supabase
        .from('organizations')
        .update({ logo_url: null })
        .eq('id', companyId);
        
      if (error) throw error;
      
      // Update local state
      onLogoChange(null);
      
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
    }
  };

  return (
    <div className="mt-6 space-y-2">
      <Label>{t.companyInfo.logo}</Label>
      <div className="flex items-center gap-4">
        {logoUrl ? (
          <div className="relative h-20 w-auto">
            <img
              src={logoUrl}
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
  );
};

export default CompanyLogoSection;
