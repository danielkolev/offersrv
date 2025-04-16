
import { useToast } from "@/hooks/use-toast";

export const printContent = (includeDateAndSignature = false) => {
  // Save original body state
  const originalOverflow = document.body.style.overflow;
  
  // Create watermark element if it doesn't exist
  let watermark = document.querySelector('.offer-watermark');
  if (!watermark) {
    watermark = document.createElement('div');
    watermark.className = 'offer-watermark';
    watermark.textContent = 'Оригинал';
    // Add the watermark to the body
    document.body.appendChild(watermark);
  }
  
  // Make sure all elements in the offer preview are visible
  const offerPreviewContent = document.querySelector('.offer-preview-content');
  if (offerPreviewContent) {
    offerPreviewContent.classList.add('print-full-content');
  }
  
  // Add date and signature if requested
  let signatureArea = document.querySelector('.signature-area-print');
  if (includeDateAndSignature) {
    if (!signatureArea) {
      signatureArea = document.createElement('div');
      signatureArea.className = 'signature-area-print no-print';
      signatureArea.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ccc;">
          <div>
            <p style="margin-bottom: 0.5rem; font-weight: bold;">Дата:</p>
            <p style="margin-bottom: 0; min-width: 150px; border-bottom: 1px solid #999;">&nbsp;</p>
          </div>
          <div>
            <p style="margin-bottom: 0.5rem; font-weight: bold;">Подпис:</p>
            <p style="margin-bottom: 0; min-width: 150px; border-bottom: 1px solid #999;">&nbsp;</p>
          </div>
        </div>
      `;
      offerPreviewContent?.appendChild(signatureArea);
    }
    (signatureArea as HTMLElement).style.display = 'block';
  } else if (signatureArea) {
    (signatureArea as HTMLElement).style.display = 'none';
  }
  
  // Prepare for printing
  document.body.classList.add('print-mode');
  document.body.style.overflow = 'visible';
  
  // Print
  window.print();
  
  // Restore original state
  setTimeout(() => {
    document.body.classList.remove('print-mode');
    document.body.style.overflow = originalOverflow;
    
    // Remove watermark after printing
    if (watermark && watermark.parentNode) {
      watermark.parentNode.removeChild(watermark);
    }
    
    // Remove date and signature area if it was added
    if (includeDateAndSignature && signatureArea && signatureArea.parentNode) {
      signatureArea.parentNode.removeChild(signatureArea);
    }
    
    // Restore original visibility
    if (offerPreviewContent) {
      offerPreviewContent.classList.remove('print-full-content');
    }
  }, 500);
};
