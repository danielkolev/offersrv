
export interface TemplateType {
  id: string;
  name: string;
  description: string;
  settings?: any;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  is_default?: boolean;
  language: string; // Changed from strict literal type to string to match DB
}
