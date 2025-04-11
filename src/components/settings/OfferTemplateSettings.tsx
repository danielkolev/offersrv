
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle, BookOpen, Trash2, Languages, Info } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TemplateType {
  id: string;
  name: string;
  description: string;
  language: 'bg' | 'en' | 'all';
  isDefault?: boolean;
}

const OfferTemplateSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('default');
  const [userTemplates, setUserTemplates] = useState<TemplateType[]>([]);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchUserTemplates();
    }
  }, [user]);
  
  const fetchUserTemplates = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_offers')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_template', true);
        
      if (error) {
        throw error;
      }
      
      if (data) {
        const templates: TemplateType[] = data.map(item => ({
          id: item.id,
          name: item.name || 'Unnamed Template',
          description: item.description || '',
          language: ((item.offer_data as any)?.details?.offerLanguage || 'all') as 'bg' | 'en' | 'all'
        }));
        
        setUserTemplates(templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: t.common.error,
        description: 'Failed to load templates',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSaveTemplate = async () => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive'
      });
      return;
    }
    
    if (!templateName.trim()) {
      toast({
        title: t.common.error,
        description: 'Please enter a template name',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('saved_offers')
        .insert({
          user_id: user.id,
          name: templateName,
          description: templateDescription,
          is_template: true,
          offer_data: {} // Empty template to be customized later
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: t.common.success,
        description: t.settings.templateCreated
      });
      
      setSaveDialogOpen(false);
      setTemplateName('');
      setTemplateDescription('');
      fetchUserTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to save template',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteTemplate = async (templateId: string) => {
    if (!user) return;
    
    if (!window.confirm(t.offer.templates.confirmDelete)) {
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('saved_offers')
        .delete()
        .eq('id', templateId)
        .eq('user_id', user.id);
        
      if (error) {
        throw error;
      }
      
      setUserTemplates(userTemplates.filter(template => template.id !== templateId));
      
      toast({
        title: t.common.success,
        description: t.offer.templates.templateDeleted
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to delete template',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderTemplateCard = (template: TemplateType, isUserTemplate = false) => (
    <Card 
      key={template.id} 
      className="hover:border-offer-blue transition-colors cursor-pointer"
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              {template.name}
            </h4>
            {template.language && template.language !== 'all' && (
              <div className="text-xs inline-flex items-center gap-1 text-muted-foreground mb-2">
                <Languages className="h-3 w-3" /> 
                {template.language === 'bg' ? 'Български' : 'English'}
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
          </div>
          {isUserTemplate && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTemplate(template.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-center mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Open template editor
          }}
        >
          {isUserTemplate ? t.settings.editTemplate : t.settings.viewTemplate}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="mb-8 pb-8 border-b">
      <div className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-semibold">{t.settings.offerTemplates}</h2>
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              {t.settings.newTemplate}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.settings.createTemplate}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">{t.offer.templates.templateName}</Label>
                <Input 
                  id="template-name" 
                  value={templateName} 
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder={t.settings.templateNamePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-description">{t.settings.templateDescription}</Label>
                <Input 
                  id="template-description" 
                  value={templateDescription} 
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder={t.settings.templateDescriptionPlaceholder}
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setSaveDialogOpen(false)}
              >
                {t.common.cancel}
              </Button>
              <Button 
                onClick={handleSaveTemplate} 
                disabled={isLoading || !templateName.trim()}
              >
                {isLoading ? t.common.processing : t.settings.createTemplate}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <p className="text-muted-foreground mb-4">{t.settings.templatesDescription}</p>
      
      <Tabs defaultValue="default" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="default">
            <BookOpen className="h-4 w-4 mr-2" />
            {t.offer.templates.defaultTemplates}
          </TabsTrigger>
          <TabsTrigger value="user" disabled={!user}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {t.offer.templates.userTemplates}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="default">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Default templates would be rendered here */}
            <Card className="bg-muted/40">
              <CardContent className="p-4 flex items-center justify-center h-32">
                <p className="text-muted-foreground italic">{t.settings.defaultTemplatesDescription}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="user">
          {isLoading ? (
            <div className="text-center py-8">{t.common.loading}</div>
          ) : userTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTemplates.map(template => renderTemplateCard(template, true))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Info className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
              <p>{t.offer.templates.noTemplates}</p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={() => setSaveDialogOpen(true)}
              >
                {t.settings.createNewTemplate}
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfferTemplateSettings;
