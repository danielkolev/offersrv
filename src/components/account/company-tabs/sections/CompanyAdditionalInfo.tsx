
import React from 'react';
import { Company } from '@/types/company';
import TextAreaGroup from '../shared/TextAreaGroup';

interface CompanyAdditionalInfoProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  sloganLabel: string;
  conclusionLabel: string;
  isEnglish?: boolean;
}

const CompanyAdditionalInfo = ({ 
  company, 
  onFieldChange, 
  sloganLabel, 
  conclusionLabel,
  isEnglish 
}: CompanyAdditionalInfoProps) => {
  const fieldPrefix = isEnglish ? '_en' : '';
  
  return (
    <div className="space-y-4">
      <TextAreaGroup
        label={sloganLabel}
        id={`slogan${fieldPrefix}`}
        value={isEnglish ? company.slogan_en : company.slogan}
        onChange={onFieldChange}
        placeholder={sloganLabel}
        field={isEnglish ? 'slogan_en' : 'slogan'}
      />
      
      <TextAreaGroup
        label={conclusionLabel}
        id={`conclusion_text${fieldPrefix}`}
        value={isEnglish ? company.conclusion_text_en : company.conclusion_text}
        onChange={onFieldChange}
        placeholder={conclusionLabel}
        field={isEnglish ? 'conclusion_text_en' : 'conclusion_text'}
      />
    </div>
  );
};

export default CompanyAdditionalInfo;
