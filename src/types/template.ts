
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
  settings?: {
    templateType?: string;
    appearance?: {
      primaryColor?: string;
      secondaryColor?: string;
      textColor?: string;
      borderColor?: string;
      backgroundColor?: string;
      tableHeaderColor?: string;
      tableRowAlternateColor?: string;
      buttonColor?: string;
      fontFamily?: string;
      fontSize?: string;
    };
    header?: {
      showCompanyLogo?: boolean;
      showCompanyName?: boolean;
      showCompanySlogan?: boolean;
      showOfferLabel?: boolean;
      useGradient?: boolean;
      headerBackgroundColor?: string;
      headerTextColor?: string;
    };
    content?: {
      showLineNumbers?: boolean;
      showProductDescription?: boolean;
      showPartNumbers?: boolean;
      showFooter?: boolean;
      footerText?: string;
      tableBorderStyle?: string; // none, solid, dashed, dotted
      tableBorderWidth?: string;
      tableBorderColor?: string;
    };
    footer?: {
      showBankDetails?: boolean;
      showSignatureArea?: boolean;
      signatureText?: string;
      footerBackgroundColor?: string;
      footerTextColor?: string;
    };
    layout?: {
      compactMode?: boolean;
      fullWidth?: boolean;
      padding?: string;
      borderRadius?: string;
      orientation?: string; // The orientation property
    };
  };
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  is_default?: boolean;
  language: string;
  templateType?: string;
}
