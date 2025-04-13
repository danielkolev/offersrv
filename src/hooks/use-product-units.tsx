
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';

export interface ProductUnit {
  id: string;
  name: string;
  name_en: string;
}

export function useProductUnits() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const [units, setUnits] = useState<ProductUnit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start with a default "no unit" option that has a non-empty ID
  const defaultUnits: ProductUnit[] = [
    { id: 'none', name: '', name_en: '' }, // Non-empty ID for "no unit" option
    { id: 'pieces', name: 'брой', name_en: 'pieces' },
  ];

  useEffect(() => {
    if (user) {
      fetchCustomUnits();
    }
  }, [user]);

  const fetchCustomUnits = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use a raw query to fetch custom units for the current user
      const { data, error } = await supabase
        .from('custom_units')
        .select('id, name, name_en')
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      const customUnits: ProductUnit[] = data || [];
      
      setUnits([...defaultUnits, ...customUnits]);
    } catch (err) {
      console.error('Error fetching custom units:', err);
      setError('Failed to load custom units');
      setUnits(defaultUnits);
    } finally {
      setIsLoading(false);
    }
  };

  // Get localized unit name based on current language
  const getLocalizedUnitName = (unitId: string): string => {
    const unit = units.find(u => u.id === unitId);
    if (!unit) return unitId;
    
    return language === 'bg' ? unit.name : unit.name_en;
  };

  return {
    units,
    isLoading,
    error,
    getLocalizedUnitName,
    defaultUnit: 'none' // Changed from empty string to 'none'
  };
}
