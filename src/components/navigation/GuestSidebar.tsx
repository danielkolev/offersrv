
import React from 'react';
import { 
  Sidebar, 
  SidebarContent 
} from '@/components/ui/sidebar';
import { Home } from 'lucide-react';
import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';

interface GuestSidebarProps {
  translatedHome: string;
  isActive: (path: string) => boolean;
}

const GuestSidebar = ({ translatedHome, isActive }: GuestSidebarProps) => {
  const mainNavItems = [
    {
      name: translatedHome,
      path: '/',
      icon: Home
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarSection 
          items={mainNavItems} 
          isItemActive={isActive} 
        />
      </SidebarContent>
    </Sidebar>
  );
};

export default GuestSidebar;
