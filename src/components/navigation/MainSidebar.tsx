
import React from 'react';
import { 
  SidebarProvider, 
  Sidebar,
  SidebarTrigger
} from '@/components/ui/sidebar';
import OfferSidebar from './OfferSidebar';

const MainSidebar = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <OfferSidebar />
        <SidebarTrigger className="fixed z-50 top-4 left-4 bg-white shadow rounded-full" />
      </div>
    </SidebarProvider>
  );
};

export default MainSidebar;
