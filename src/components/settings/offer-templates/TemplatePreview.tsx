
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface TemplatePreviewProps {
  settings: any;
  fullScreen?: boolean;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ settings, fullScreen = false }) => {
  const { t } = useLanguage();

  return (
    <div className={`preview-container ${fullScreen ? 'w-full h-full' : 'h-64'} border rounded-md overflow-hidden`}>
      <div className="text-center p-4 text-muted-foreground">
        {t.settings.preview}
      </div>
    </div>
  );
};

export default TemplatePreview;
