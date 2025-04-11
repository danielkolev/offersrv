
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Translations } from '@/types/language';
import { SavedProduct } from '@/types/database';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<SavedProduct>) => Promise<void>;
  product: Partial<SavedProduct> | null;
  isSubmitting: boolean;
  isEditMode: boolean;
  t: Translations;
}

const ProductFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  product,
  isSubmitting,
  isEditMode,
  t
}: ProductFormDialogProps) => {
  // Create schema for form validation
  const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: t.common.required }),
    description: z.string().optional(),
    part_number: z.string().optional(),
    unit_price: z.coerce.number().min(0, { message: 'Price must be a positive number' })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: product?.id || undefined,
      name: product?.name || '',
      description: product?.description || '',
      part_number: product?.part_number || '',
      unit_price: product?.unit_price || 0
    }
  });

  // Update form values when product changes
  React.useEffect(() => {
    if (product) {
      form.reset({
        id: product.id,
        name: product.name || '',
        description: product.description || '',
        part_number: product.part_number || '',
        unit_price: product.unit_price || 0
      });
    }
  }, [product, form]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t.savedProducts.editProduct : t.savedProducts.addProduct}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.products.name}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="part_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.products.partNumber}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.common.description}</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.products.unitPrice}</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {t.common.cancel}
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.common.saving}
                  </>
                ) : (
                  t.common.save
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
