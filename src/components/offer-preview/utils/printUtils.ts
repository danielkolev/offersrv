
export const printContent = () => {
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
  }, 500);
};
