
export const printContent = () => {
  // Save original body state
  const originalOverflow = document.body.style.overflow;
  
  // Create watermark element if it doesn't exist
  let watermark = document.querySelector('.offer-watermark');
  if (!watermark) {
    watermark = document.createElement('div');
    watermark.className = 'offer-watermark';
    watermark.textContent = 'Оригинал';
    // Add the watermark to the print container to ensure it only shows with the content
    const printContainer = document.querySelector('.offer-preview-content');
    if (printContainer) {
      printContainer.appendChild(watermark);
    } else {
      document.body.appendChild(watermark);
    }
  }
  
  // Hide everything before printing
  document.body.classList.add('print-content');
  document.body.style.overflow = 'visible';
  
  // Print
  window.print();
  
  // Restore original state
  setTimeout(() => {
    document.body.classList.remove('print-content');
    document.body.style.overflow = originalOverflow;
    
    // Remove watermark after printing
    if (watermark && watermark.parentNode) {
      watermark.parentNode.removeChild(watermark);
    }
  }, 500);
};
