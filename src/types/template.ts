
export interface TemplateType {
  id: string;
  name: string;
  description: string;
  template?: {
    details?: {
      offerLanguage?: string;
    };
    products?: any[];
    [key: string]: any;
  };
  settings?: any;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  is_default?: boolean;
  language: string; // Changed from strict literal type to string to match DB
  templateType?: string; // Added templateType property
}
