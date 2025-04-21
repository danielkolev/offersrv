
import React, { createContext, useContext, ReactNode } from 'react';
import { Product } from '@/types/offer';

interface ProductsContextType {
  products: Product[];
}

const defaultContext: ProductsContextType = {
  products: []
};

const ProductsContext = createContext<ProductsContextType>(defaultContext);

export const ProductsProvider = ({ children, products = [] }: { children: ReactNode, products?: Product[] }) => {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
