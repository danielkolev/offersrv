
import html2pdf from 'html2pdf.js';
import { useToast } from "@/hooks/use-toast";

export const generatePdf = (
  element: HTMLElement,
  filename: string,
  onStart?: () => void,
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  const options = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Add temporary class for PDF export
  element.classList.add('pdf-export');
  
  if (onStart) onStart();

  html2pdf().set(options).from(element).save()
    .then(() => {
      // Remove temporary class
      element.classList.remove('pdf-export');
      if (onSuccess) onSuccess();
    })
    .catch((error) => {
      console.error("PDF generation error:", error);
      element.classList.remove('pdf-export');
      if (onError) onError(error);
    });
};

export const getOfferFileName = (clientName: string, offerNumber?: string) => {
  const sanitizedClientName = clientName || 'Client';
  const date = new Date().toLocaleDateString().replace(/\//g, '-');
  return `Offer-${offerNumber ? `${offerNumber}-` : ''}${sanitizedClientName}-${date}`;
};
