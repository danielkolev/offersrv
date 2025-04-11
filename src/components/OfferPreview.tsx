
import React from 'react';
import { useOffer } from '@/context/OfferContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const OfferPreview = () => {
  const { offer, calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const offerElement = document.querySelector('.offer-preview-content');
    if (offerElement) {
      const range = document.createRange();
      range.selectNode(offerElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      
      toast({
        title: 'Copied to clipboard',
        description: 'The offer content has been copied to your clipboard',
      });
    }
  };

  return (
    <Card className="mb-6">
      <div className="p-4 flex justify-end gap-2 no-print">
        <Button variant="outline" onClick={handleCopy} className="gap-2">
          <Copy size={16} /> Copy
        </Button>
        <Button onClick={handlePrint} className="gap-2">
          <Printer size={16} /> Print
        </Button>
      </div>
      
      <CardContent>
        <div className="print-container offer-preview-content">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div className="flex-1">
              {offer.company.logo && (
                <img 
                  src={offer.company.logo} 
                  alt="Company Logo" 
                  className="h-16 object-contain mb-4"
                />
              )}
              <h1 className="text-2xl font-bold text-offer-gray">{offer.company.name}</h1>
              <p className="text-sm text-muted-foreground">
                {offer.company.address}<br />
                {offer.company.city}, {offer.company.country}<br />
                VAT: {offer.company.vatNumber}
              </p>
              <p className="text-sm mt-2">
                {offer.company.phone}<br />
                {offer.company.email}<br />
                {offer.company.website}
              </p>
            </div>
            
            <div className="min-w-[250px] border rounded-md p-4 bg-offer-lightgray">
              <h2 className="text-xl font-medium text-offer-blue">OFFER</h2>
              <div className="grid grid-cols-2 gap-1 mt-2">
                <p className="text-sm font-medium">Number:</p>
                <p className="text-sm text-right">{offer.details.offerNumber}</p>
                
                <p className="text-sm font-medium">Date:</p>
                <p className="text-sm text-right">{formatDate(offer.details.date)}</p>
                
                <p className="text-sm font-medium">Valid until:</p>
                <p className="text-sm text-right">{formatDate(offer.details.validUntil)}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-2">To:</h2>
            <div className="border-l-2 border-offer-blue pl-4">
              <h3 className="font-medium">{offer.client.name}</h3>
              <p className="text-sm">
                Attn: {offer.client.contactPerson}<br />
                {offer.client.address}<br />
                {offer.client.city}, {offer.client.country}<br />
                VAT: {offer.client.vatNumber}
              </p>
              <p className="text-sm mt-2">
                {offer.client.phone}<br />
                {offer.client.email}
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="bg-offer-blue text-white py-2 px-4 rounded-t-md">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5 font-medium">Item</div>
                {offer.details.showPartNumber && (
                  <div className="col-span-2 font-medium">Part No.</div>
                )}
                <div className={`col-span-${offer.details.showPartNumber ? '1' : '3'} text-center font-medium`}>Qty</div>
                <div className={`col-span-${offer.details.showPartNumber ? '2' : '2'} text-right font-medium`}>Unit Price</div>
                <div className={`col-span-${offer.details.showPartNumber ? '2' : '2'} text-right font-medium`}>Total</div>
              </div>
            </div>
            
            <div className="border-x border-b rounded-b-md overflow-hidden">
              {offer.products.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`grid grid-cols-12 gap-2 px-4 py-3 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-offer-lightgray'
                  }`}
                >
                  <div className="col-span-5">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.description}</div>
                  </div>
                  
                  {offer.details.showPartNumber && (
                    <div className="col-span-2 self-center">{product.partNumber || '-'}</div>
                  )}
                  
                  <div className={`col-span-${offer.details.showPartNumber ? '1' : '3'} self-center text-center`}>
                    {product.quantity}
                  </div>
                  
                  <div className={`col-span-${offer.details.showPartNumber ? '2' : '2'} self-center text-right`}>
                    {formatCurrency(product.unitPrice)}
                  </div>
                  
                  <div className={`col-span-${offer.details.showPartNumber ? '2' : '2'} self-center text-right font-medium`}>
                    {formatCurrency(product.quantity * product.unitPrice)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-64">
              <div className="grid grid-cols-2 gap-1 border-b pb-2 mb-2">
                <p className="font-medium">Subtotal:</p>
                <p className="text-right">{formatCurrency(calculateSubtotal())}</p>
                
                {offer.details.includeVat && (
                  <>
                    <p className="font-medium">VAT ({offer.details.vatRate}%):</p>
                    <p className="text-right">{formatCurrency(calculateVat())}</p>
                  </>
                )}
                
                {offer.details.transportCost > 0 && (
                  <>
                    <p className="font-medium">Transport:</p>
                    <p className="text-right">{formatCurrency(offer.details.transportCost)}</p>
                  </>
                )}
                
                {offer.details.otherCosts > 0 && (
                  <>
                    <p className="font-medium">Other costs:</p>
                    <p className="text-right">{formatCurrency(offer.details.otherCosts)}</p>
                  </>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-1">
                <p className="font-bold text-lg">TOTAL:</p>
                <p className="text-right font-bold text-lg text-offer-blue">
                  {formatCurrency(calculateTotal())}
                </p>
                
                {offer.details.includeVat ? (
                  <p className="col-span-2 text-right text-xs text-muted-foreground">
                    (VAT included)
                  </p>
                ) : (
                  <p className="col-span-2 text-right text-xs text-muted-foreground">
                    (VAT excluded)
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {offer.details.notes && (
            <div className="mb-8">
              <h3 className="font-medium mb-2">Notes:</h3>
              <div className="border rounded-md p-4 bg-offer-lightgray whitespace-pre-line text-sm">
                {offer.details.notes}
              </div>
            </div>
          )}
          
          <div className="text-center text-sm text-muted-foreground mt-12 pt-4 border-t">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferPreview;
