import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
interface CompanyGeneralInfoFieldsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}
const CompanyGeneralInfoFields = ({
  company,
  onFieldChange,
  t
}: CompanyGeneralInfoFieldsProps) => {
  return <div className="space-y-4 mt-6">
      {/* Common fields (not language-specific) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        
        
      </div>

      

      
    </div>;
};
export default CompanyGeneralInfoFields;