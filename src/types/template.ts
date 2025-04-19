
export interface TemplateType {
  id: string;
  name: string;
  description: string;
  settings: {
    primaryColor: string;
    tableHeaderColor: string;
    orientation: 'portrait' | 'landscape';
    templateType?: string;  // Adding optional properties needed for backward compatibility
    appearance?: {
      primaryColor?: string;
      tableHeaderColor?: string;
    };
  };
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  is_default?: boolean;
  language: string;
  template?: any;  // Adding optional template property for backward compatibility
}
