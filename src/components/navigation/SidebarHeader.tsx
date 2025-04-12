
import React from 'react';
import { SidebarHeader as SidebarHeaderUI } from '@/components/ui/sidebar';

const SidebarHeader = () => {
  return (
    <SidebarHeaderUI className="px-4">
      <div className="flex items-center space-x-2 py-4">
        <img src="/logo.svg" alt="Offer Forge Logo" className="h-6" />
        <span className="font-bold text-xl">Offer Forge</span>
      </div>
    </SidebarHeaderUI>
  );
};

export default SidebarHeader;
