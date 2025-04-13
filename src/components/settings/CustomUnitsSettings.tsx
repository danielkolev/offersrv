
import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CustomUnit {
  id: string;
  name: string;
  name_en: string;
}

const CustomUnitsSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [units, setUnits] = useState<CustomUnit[]>([]);
  const [newUnit, setNewUnit] = useState({ name: '', name_en: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing custom units
  useEffect(() => {
    if (user) {
      fetchCustomUnits();
    }
  }, [user]);

  const fetchCustomUnits = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use raw query instead of RPC
      const { data, error } = await supabase
        .from('custom_units')
        .select('id, name, name_en')
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      const customUnits: CustomUnit[] = data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        name_en: item.name_en
      })) || [];
      
      setUnits(customUnits);
    } catch (err) {
      console.error('Error fetching custom units:', err);
      setError(t.settings.errorLoadingSettings || 'Failed to load custom units');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUnit = async () => {
    if (!newUnit.name || !newUnit.name_en) {
      toast({
        title: t.settings.validationError || 'Validation Error',
        description: t.settings.unitNameRequired || 'Unit name is required in both languages',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Use raw query to insert unit
      const { data, error } = await supabase
        .from('custom_units')
        .insert({
          user_id: user?.id,
          name: newUnit.name,
          name_en: newUnit.name_en
        })
        .select();
        
      if (error) throw error;
      
      // Refresh the units list
      fetchCustomUnits();
      setNewUnit({ name: '', name_en: '' });
      
      toast({
        title: t.settings.unitAdded || 'Unit Added',
        description: t.settings.unitAddedSuccess || 'Custom unit has been added successfully'
      });
    } catch (err) {
      console.error('Error adding custom unit:', err);
      toast({
        title: t.settings.errorSavingSettings || 'Error',
        description: t.settings.unitAddError || 'Failed to add custom unit',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUnit = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Use raw query to delete unit
      const { error } = await supabase
        .from('custom_units')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      setUnits(units.filter(unit => unit.id !== id));
      
      toast({
        title: t.settings.unitDeleted || 'Unit Deleted',
        description: t.settings.unitDeletedSuccess || 'Custom unit has been deleted'
      });
    } catch (err) {
      console.error('Error deleting custom unit:', err);
      toast({
        title: t.settings.errorSavingSettings || 'Error',
        description: t.settings.unitDeleteError || 'Failed to delete custom unit',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.settings.customUnits || 'Custom Units'}</CardTitle>
        <CardDescription>
          {t.settings.customUnitsDescription || 'Add custom measurement units for your products'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-end gap-2 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              {t.settings.unitNameBg || 'Bulgarian Name'}
            </label>
            <Input
              value={newUnit.name}
              onChange={(e) => setNewUnit({ ...newUnit, name: e.target.value })}
              placeholder={t.settings.unitNamePlaceholderBg || 'e.g. брой, метър'}
              disabled={isLoading}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              {t.settings.unitNameEn || 'English Name'}
            </label>
            <Input
              value={newUnit.name_en}
              onChange={(e) => setNewUnit({ ...newUnit, name_en: e.target.value })}
              placeholder={t.settings.unitNamePlaceholderEn || 'e.g. piece, meter'}
              disabled={isLoading}
            />
          </div>
          <Button 
            onClick={handleAddUnit} 
            disabled={isLoading || !newUnit.name || !newUnit.name_en}
            className="flex-shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" />
            {t.settings.addUnit || 'Add Unit'}
          </Button>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            {t.settings.existingUnits || 'Existing Units'}
          </h3>
          
          {units.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">
              {t.settings.noCustomUnits || 'No custom units added yet'}
            </p>
          ) : (
            <ScrollArea className="h-[200px] rounded-md border">
              <div className="p-4">
                {units.map(unit => (
                  <div key={unit.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{unit.name} / {unit.name_en}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteUnit(unit.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomUnitsSettings;
