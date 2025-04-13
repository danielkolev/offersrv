
import { Offer, Product, CompanyInfo, ClientInfo, OfferDetails } from '@/types/offer';
import { useEffect } from 'react';
import { useTemplateManagement } from '@/hooks/use-template-management';

export function useOfferActions(
  offer: Offer,
  setOffer: React.Dispatch<React.SetStateAction<Offer>>,
  markUserInteraction: () => void
) {
  const { getDefaultTemplate, getTemplateById, defaultTemplateId } = useTemplateManagement();

  // Apply template settings to the offer
  const applyTemplate = (templateId?: string) => {
    markUserInteraction();
    
    const template = templateId 
      ? getTemplateById(templateId) 
      : getDefaultTemplate();
    
    if (!template || !template.settings) {
      console.log('No template settings found');
      return;
    }
    
    // Set template settings in offer
    setOffer(prevOffer => ({
      ...prevOffer,
      templateSettings: template.settings,
      templateId: template.id
    }));
    
    return template;
  };
  
  // Apply default template on first load
  useEffect(() => {
    if (!offer.templateId && !offer.templateSettings && defaultTemplateId) {
      applyTemplate(defaultTemplateId);
    }
  }, [defaultTemplateId]);

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

  // Update an existing product
  const updateProduct = (index: number, product: Product) => {
    markUserInteraction();
    setOffer(prevOffer => {
      const newProducts = [...prevOffer.products];
      newProducts[index] = product;
      return {
        ...prevOffer,
        products: newProducts
      };
    });
  };

  // Remove a product
  const removeProduct = (index: number) => {
    markUserInteraction();
    setOffer(prevOffer => {
      const newProducts = [...prevOffer.products];
      newProducts.splice(index, 1);
      return {
        ...prevOffer,
        products: newProducts
      };
    });
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
