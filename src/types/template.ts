
export interface TemplateType {
  id: string;
  name: string;
  description: string;
  settings: {
    primaryColor: string;
    tableHeaderColor: string;
    orientation: 'portrait' | 'landscape';
  };
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  is_default?: boolean;
  language: string;
}
