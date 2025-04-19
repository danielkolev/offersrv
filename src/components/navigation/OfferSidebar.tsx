
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Home, FileEdit, Files, Users, Package, Building, Settings, FileText, LayoutTemplate } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import CompanyManager from '@/components/company/CompanyManager';

interface OfferSidebarProps {
  isMobile?: boolean;
}

const OfferSidebar = ({
  isMobile = false
}: OfferSidebarProps) => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const isActive = (path: string) => location.pathname === path;

  // Navigation items with icons
  const navItems = [{
    name: t.navigation.home,
    path: '/dashboard',
    icon: Home
  }, {
    name: t.navigation.newOffer,
    path: '/new-offer',
    icon: FileEdit
  }, {
    name: t.navigation.savedOffers,
    path: '/saved-offers',
    icon: Files
  }, {
    name: t.navigation.clients,
    path: '/saved-clients',
    icon: Users
  }, {
    name: t.navigation.products,
    path: '/saved-products',
    icon: Package
  }, {
    name: t.navigation.templates,
    path: '/templates',
    icon: LayoutTemplate
  }, {
    name: t.navigation.companies,
    path: '/company-management',
    icon: Building
  }, {
    name: t.navigation.settings,
    path: '/settings',
    icon: Settings
  }];

  return (
    <Sidebar variant={isMobile ? "floating" : "sidebar"} collapsible={isMobile ? "none" : "offcanvas"}>
      <SidebarHeader className="px-4 py-2">
        {user && (
          <div className="mb-2 max-w-full border-b pb-3">
            <CompanyManager 
              onSelectCompany={setSelectedCompanyId} 
              selectedCompanyId={selectedCompanyId} 
              disableCreate={true} 
              prominentDisplay={true}
              currentLanguage={language}
            />
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.name}>
                    <Link to={item.path}>
                      <item.icon className="h-4 w-4" />
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
