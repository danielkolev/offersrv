
import React from 'react';
import { 
  SidebarProvider, 
  Sidebar,
  SidebarTrigger
} from '@/components/ui/sidebar';
import OfferSidebar from './OfferSidebar';

const MainSidebar = () => {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarTrigger className="fixed z-50 top-4 left-4 bg-white shadow rounded-full" />
      <OfferSidebar />
    </SidebarProvider>
  );
};

export default MainSidebar;
