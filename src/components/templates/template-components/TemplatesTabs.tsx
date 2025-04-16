
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, PlusCircle } from 'lucide-react';
import TemplatesList from './TemplatesList';
import { TemplateType } from '@/types/template';

interface TemplatesTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  defaultTemplates: TemplateType[];
  userTemplates: TemplateType[];
  isLoading: boolean;
  onSelectTemplate: (template: Partial<any>) => void;
  onDeleteTemplate?: (templateId: string) => void;
  onCreateTemplate: () => void;
  isAuthenticated: boolean;
}

const TemplatesTabs: React.FC<TemplatesTabsProps> = ({
  activeTab,
  onTabChange,
  defaultTemplates,
  userTemplates,
  isLoading,
  onSelectTemplate,
  onDeleteTemplate,
  onCreateTemplate,
  isAuthenticated
}) => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="default" value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="default">
          <BookOpen className="h-4 w-4 mr-2" />
          {t.offer.templates.defaultTemplates}
        </TabsTrigger>
        <TabsTrigger value="user" disabled={!isAuthenticated}>
          <PlusCircle className="h-4 w-4 mr-2" />
          {t.offer.templates.userTemplates}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="default">
        <TemplatesList
          templates={defaultTemplates}
          isLoading={false}
          onSelectTemplate={onSelectTemplate}
          onCreateTemplate={onCreateTemplate}
        />
      </TabsContent>
      
      <TabsContent value="user">
        <TemplatesList
          templates={userTemplates}
          isLoading={isLoading}
          isUserTemplates={true}
          onSelectTemplate={onSelectTemplate}
          onDeleteTemplate={onDeleteTemplate}
          onCreateTemplate={onCreateTemplate}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TemplatesTabs;
