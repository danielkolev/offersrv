
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Company } from '@/types/company';

interface TextAreaGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (field: keyof Company, value: string) => void;
  placeholder?: string;
  field: keyof Company;
}

const TextAreaGroup = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  field
}: TextAreaGroupProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value || ''}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder || label}
        className="min-h-[100px] resize-none"
      />
    </div>
  );
};

export default TextAreaGroup;
