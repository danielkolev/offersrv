
import { Offer, Product, CompanyInfo, ClientInfo, OfferDetails } from '@/types/offer';
import { useEffect } from 'react';
import { useTemplateManagement } from '@/hooks/use-template-management';
import { TemplateType } from '@/hooks/use-template-management';

export function useOfferActions(
  offer: Offer,
  setOffer: React.Dispatch<React.SetStateAction<Offer>>,
  markUserInteraction: () => void
) {
  const { getDefaultTemplate, getTemplateById, defaultTemplateId } = useTemplateManagement();

  // Apply template settings to the offer
  const applyTemplate = (templateId?: string) => {
    markUserInteraction();
    
    // Check if it's a temporary template ID
    if (templateId?.startsWith('temp-')) {
      const tempTemplateData = window.localStorage.getItem(`temp-template-${templateId}`);
      if (tempTemplateData) {
        try {
          const templateData = JSON.parse(tempTemplateData);
          // Apply the template data directly
          setOffer(prevOffer => ({
            ...prevOffer,
            ...templateData
          }));
          
          // Clean up the temporary storage
          window.localStorage.removeItem(`temp-template-${templateId}`);
          return;
        } catch (e) {
          console.error('Error parsing temporary template:', e);
        }
      }
    }
    
    // Regular template handling
    const template = templateId 
      ? getTemplateById(templateId) 
      : getDefaultTemplate();
    
    if (!template || !template.settings) {
      console.log('No template settings found');
      return null;
    }
    
    // Set template settings in offer
    setOffer(prevOffer => ({
      ...prevOffer,
      templateSettings: template.settings,
      templateId: template.id
    }));
    
    return template;
  };
  
  // Apply default template on first load - only if no template is set yet
  useEffect(() => {
    if (!offer.templateId && !offer.templateSettings && defaultTemplateId) {
      applyTemplate(defaultTemplateId);
    }
  }, [defaultTemplateId, offer.templateId, offer.templateSettings]);

  // Update company information
  const updateCompanyInfo = (companyInfo: Partial<CompanyInfo>) => {
    markUserInteraction();
    setOffer(prevOffer => ({
      ...prevOffer,
      company: {
        ...prevOffer.company,
        ...companyInfo
      }
    }));
  };

  // Update client information
  const updateClientInfo = (clientInfo: Partial<ClientInfo>) => {
    markUserInteraction();
    setOffer(prevOffer => ({
      ...prevOffer,
      client: {
        ...prevOffer.client,
        ...clientInfo
      }
    }));
  };

  // Update offer details
  const updateOfferDetails = (details: Partial<OfferDetails>) => {
    markUserInteraction();
    setOffer(prevOffer => ({
      ...prevOffer,
      details: {
        ...prevOffer.details,
        ...details
      }
    }));
  };

  // Add a new product
  const addProduct = (product: Product) => {
    markUserInteraction();
    setOffer(prevOffer => ({
      ...prevOffer,
      products: [...prevOffer.products, product]
    }));
  };

  // Update an existing product - using id instead of index for better reliability
  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    markUserInteraction();
    setOffer(prevOffer => {
      const productIndex = prevOffer.products.findIndex(p => p.id === id);
      if (productIndex === -1) return prevOffer;
      
      const newProducts = [...prevOffer.products];
      newProducts[productIndex] = {
        ...newProducts[productIndex],
        ...updatedProduct
      };
      
      return {
        ...prevOffer,
        products: newProducts
      };
    });
  };

  // Remove a product - using id instead of index for better reliability
  const removeProduct = (id: string) => {
    markUserInteraction();
    setOffer(prevOffer => ({
      ...prevOffer,
      products: prevOffer.products.filter(product => product.id !== id)
    }));
  };

  // Clear all products
  const clearProducts = () => {
    markUserInteraction();
    setOffer(prevOffer => ({
      ...prevOffer,
      products: []
    }));
  };

  // Reset products to default state
  const resetProducts = () => {
    markUserInteraction();
    setOffer(prevOffer => ({
      ...prevOffer,
      products: []
    }));
  };

  return {
    updateCompanyInfo,
    updateClientInfo,
    updateOfferDetails,
    addProduct,
    updateProduct,
    removeProduct,
    clearProducts,
    resetProducts,
    applyTemplate
  };
}
