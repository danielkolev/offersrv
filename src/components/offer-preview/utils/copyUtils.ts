
export const copyToClipboard = (
  selector: string,
  onSuccess?: () => void
): boolean => {
  const element = document.querySelector(selector);
  if (element) {
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    const success = document.execCommand('copy');
    window.getSelection()?.removeAllRanges();
    
    if (success && onSuccess) {
      onSuccess();
    }
    
    return success;
  }
  return false;
};
