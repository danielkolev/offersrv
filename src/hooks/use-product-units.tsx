
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
  const { language } = useLanguage(); // Use language instead of currentLanguage
  const [units, setUnits] = useState<ProductUnit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default units that are always available
  const defaultUnits: ProductUnit[] = [
    { id: 'pieces', name: 'брой', name_en: 'pieces' },
    { id: 'hours', name: 'часове', name_en: 'hours' },
    { id: 'days', name: 'дни', name_en: 'days' },
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
      
      // Using raw SQL query instead of table name directly since the custom_units
      // might not be in the TypeScript definitions yet
      const { data, error } = await supabase
        .rpc('get_custom_units', { user_id_param: user?.id })
        .select();
        
      if (error) throw error;
      
      const customUnits: ProductUnit[] = data?.map((unit: any) => ({
        id: unit.id,
        name: unit.name,
        name_en: unit.name_en
      })) || [];
      
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
    defaultUnit: defaultUnits[0].id
  };
}
