
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { useAuth } from '@/context/AuthContext';
import SidebarHeader from './SidebarHeader';
import SidebarSection from './SidebarSection';
import GuestSidebar from './GuestSidebar';
import { useSidebarNavigation } from './useSidebarNavigation';

interface OfferSidebarProps {
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

const OfferSidebar = ({ collapsible = 'offcanvas' }: OfferSidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const { 
    mainNavItems, 
    managementNavItems, 
    templatesNavItems, 
    settingsNavItems,
    t
  } = useSidebarNavigation();
  
  const isActive = (path: string) => location.pathname === path;
  
  if (!user) {
    return <GuestSidebar translatedHome={t.common.home} isActive={isActive} />;
  }
  
  return (
    <Sidebar collapsible={collapsible}>
      <SidebarHeader />
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarSection 
          items={mainNavItems} 
          isItemActive={isActive} 
        />
        
        {/* Management Section */}
        <SidebarSection 
          title={t.common.manageAccount}
          items={managementNavItems} 
          isItemActive={isActive} 
        />
        
        {/* Templates Section */}
        <SidebarSection 
          title={t.offer.templates.title}
          items={templatesNavItems} 
          isItemActive={isActive} 
        />
        
        {/* Settings Section */}
        <SidebarSection 
          title={t.settings.title}
          items={settingsNavItems} 
          isItemActive={isActive} 
        />
      </SidebarContent>
    </Sidebar>
  );
};

export default OfferSidebar;
