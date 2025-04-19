
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Company } from '@/types/company';

interface FieldGroupProps {
  label: string;
  id: string;
  value: string;
  onChange: (field: keyof Company, value: string) => void;
  placeholder?: string;
  field: keyof Company;
  disabled?: boolean;
}

const FieldGroup = ({ label, id, value, onChange, placeholder, field, disabled }: FieldGroupProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value || ''}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default FieldGroup;
