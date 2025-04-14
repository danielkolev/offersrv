
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { BookmarkIcon, UsersIcon, PackageIcon, Settings, Home, Building, LayoutTemplate } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import CompanyManager from '@/components/company/CompanyManager';

const OfferSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    // In a real implementation, you'd store this in localStorage or context
    localStorage.setItem('selectedCompanyId', companyId);
  };
  
  // Load selected company from localStorage on initial load
  useEffect(() => {
    const storedCompanyId = localStorage.getItem('selectedCompanyId');
    if (storedCompanyId) {
      setSelectedCompanyId(storedCompanyId);
    }
  }, []);
  
  // Navigation items
  const navItems = [
    {
      name: t.common?.home || "Home",
      path: '/',
      icon: Home
    },
    {
      name: t.savedOffers?.title || "Saved Offers",
      path: '/saved-offers',
      icon: BookmarkIcon
    },
    {
      name: t.savedClients?.title || "Saved Clients",
      path: '/saved-clients',
      icon: UsersIcon
    },
    {
      name: t.savedProducts?.title || "Saved Products",
      path: '/saved-products',
      icon: PackageIcon
    },
    {
      name: t.common?.templates || "Templates",
      path: '/templates',
      icon: LayoutTemplate
    },
    {
      name: t.company?.manage || "Manage Companies",
      path: '/company-management',
      icon: Building
    },
    {
      name: t.settings?.title || "Settings",
      path: '/settings',
      icon: Settings
    }
  ];
  
  if (!user) {
    // Show only home for non-authenticated users
    return (
      <Sidebar>
        <SidebarHeader className="px-4">
          <div className="flex items-center space-x-2 py-4">
            <img src="/logo.svg" alt="Offer Forge Logo" className="h-6" />
            <span className="font-bold text-xl">Offer Forge</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive('/')}>
                    <Link to="/">
                      <Home className="mr-2 h-4 w-4" />
                      <span>{t.common?.home || "Home"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  
  return (
    <Sidebar>
      <SidebarHeader className="px-4">
        <div className="flex items-center space-x-2 py-4">
          <img src="/logo.svg" alt="Offer Forge Logo" className="h-6" />
          <span className="font-bold text-xl">Offer Forge</span>
        </div>
        
        {/* Company selector below the logo - Add truncation to handle long names */}
        <div className="mt-4 mb-2 max-w-full">
          <div className="truncate">
            <CompanyManager 
              onSelectCompany={handleSelectCompany} 
              selectedCompanyId={selectedCompanyId}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t.common?.navigation || "Navigation"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default OfferSidebar;
