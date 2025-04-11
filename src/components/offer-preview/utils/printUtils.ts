
export const printContent = () => {
  // Save original body state
  const originalOverflow = document.body.style.overflow;
  
  // Hide everything before printing
  document.body.classList.add('print-content');
  document.body.style.overflow = 'visible';
  
  // Print
  window.print();
  
  // Restore original state
  setTimeout(() => {
    document.body.classList.remove('print-content');
    document.body.style.overflow = originalOverflow;
  }, 500);
};
