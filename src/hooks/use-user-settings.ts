
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export interface OfferSettingsValues {
  usePrefix: boolean;
  prefix?: string;
  suffixYear: boolean;
  defaultVatRate: number;
}

export interface BankDetailsValues {
  showBankDetails: boolean;
  bankName?: string;
  iban?: string;
  swift?: string;
  additionalInfo?: string;
}

interface UseUserSettingsReturn {
  isLoading: boolean;
  loadSettings: <T>(settingsType: 'offer_settings' | 'bank_details') => Promise<T | null>;
  saveSettings: <T>(settingsType: 'offer_settings' | 'bank_details', values: T) => Promise<void>;
}

// Default settings to use when none exist or when there's an error
const defaultOfferSettings: OfferSettingsValues = {
  usePrefix: false,
  prefix: 'OF-',
  suffixYear: true,
  defaultVatRate: 20
};

const defaultBankSettings: BankDetailsValues = {
  showBankDetails: false,
  bankName: '',
  iban: '',
  swift: '',
  additionalInfo: ''
};

export function useUserSettings(): UseUserSettingsReturn {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);

  const loadSettings = async <T>(settingsType: 'offer_settings' | 'bank_details'): Promise<T | null> => {
    if (!user) return null;
    
    // If we've already encountered an error, return defaults to prevent continuous API calls
    if (hasErrored) {
      console.log("Using default settings due to previous error");
      return (settingsType === 'offer_settings' ? defaultOfferSettings : defaultBankSettings) as unknown as T;
    }
    
    setIsLoading(true);
    try {
      // Using a raw query to avoid TypeScript errors with user_settings table
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (error) {
        throw error;
      }
      
      if (data && data[settingsType]) {
        return data[settingsType] as T;
      }
      
      // If no settings found, return defaults
      return (settingsType === 'offer_settings' ? defaultOfferSettings : defaultBankSettings) as unknown as T;
    } catch (error) {
      console.error(`Error loading ${settingsType}:`, error);
      setHasErrored(true);
      toast({
        title: t.common.error,
        description: t.settings.errorLoadingSettings,
        variant: 'destructive'
      });
      
      // Return default settings on error
      return (settingsType === 'offer_settings' ? defaultOfferSettings : defaultBankSettings) as unknown as T;
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveSettings = async <T>(settingsType: 'offer_settings' | 'bank_details', values: T): Promise<void> => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check if settings exist for this user
      const { data: existingSettings, error: checkError } = await supabase
        .from('user_settings')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      const updateData: Record<string, any> = {};
      updateData[settingsType] = values;
      
      if (existingSettings) {
        // Update existing settings
        // Using raw query to avoid TypeScript errors
        const { error } = await supabase
          .from('user_settings')
          .update(updateData)
          .eq('id', existingSettings.id);
          
        if (error) throw error;
      } else {
        // Create new settings
        // Using raw query to avoid TypeScript errors
        const { error } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            ...updateData
          });
          
        if (error) throw error;
      }
      
      toast({
        title: t.common.success,
        description: t.settings.settingsSaved
      });
    } catch (error) {
      console.error(`Error saving ${settingsType}:`, error);
      toast({
        title: t.common.error,
        description: t.settings.errorSavingSettings,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    loadSettings,
    saveSettings
  };
}
