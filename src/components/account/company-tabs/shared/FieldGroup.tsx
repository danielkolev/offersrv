
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
  isReadOnly?: boolean;  // Добавяме поддръжка за readOnly пропърти
  helperText?: string;   // Добавяме поддръжка за помощен текст
}

const FieldGroup = ({ 
  label, 
  id, 
  value, 
  onChange, 
  placeholder, 
  field, 
  disabled,
  isReadOnly,
  helperText
}: FieldGroupProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value || ''}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={isReadOnly}
      />
      {helperText && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default FieldGroup;
