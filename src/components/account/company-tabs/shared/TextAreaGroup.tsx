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
  return;
};
export default TextAreaGroup;