
import html2pdf from 'html2pdf.js';
import { printContent } from '@/components/offer-preview/utils/printUtils';

export const getOfferFileName = (clientName: string, offerNumber: string) => {
  const formattedClientName = clientName.replace(/\s+/g, '-');
  const date = new Date().toLocaleDateString().replace(/\//g, '-');
  return `Offer-${formattedClientName}-${offerNumber}-${date}`;
};

export const exportToPdf = (
  element: Element | null, 
  filename: string, 
  onStart: () => void, 
  onSuccess: () => void, 
  onError: (error: any) => void
) => {
  if (!element) return;
  
  const options = {
    margin: 10,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Add temporary class for PDF export
  element.classList.add('pdf-export');
  
  onStart();

  html2pdf().set(options).from(element).save()
    .then(() => {
      // Remove temporary class
      element.classList.remove('pdf-export');
      onSuccess();
    })
    .catch((error) => {
      console.error("PDF generation error:", error);
      element.classList.remove('pdf-export');
      onError(error);
    });
};

export const handlePrint = (
  onBeforePrint: () => void, 
  onAfterPrint: () => void
) => {
  onBeforePrint();
  
  setTimeout(() => {
    // Use the centralized print utility
    printContent();
    
    // Call the after-print callback after a delay
    setTimeout(onAfterPrint, 500);
  }, 500);
};
