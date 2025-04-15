
import React from 'react';
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
import { BookmarkIcon, UsersIcon, PackageIcon, Settings, Home, Building, LayoutTemplate, FileEdit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCompanySelection } from '@/hooks/useCompanySelection';

interface OfferSidebarProps {
  isMobile?: boolean;
}

const OfferSidebar = ({ isMobile = false }: OfferSidebarProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();
  const { selectedCompanyId } = useCompanySelection(true);
  
  const isActive = (path: string) => location.pathname === path;
  
  // Navigation items
  const navItems = [
    {
      name: t.common?.home || "Home",
      path: '/',
      icon: Home
    },
    {
      name: t.navigation?.newOffer || "New Offer",
      path: '/new-offer',
      icon: FileEdit
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
      name: t.company?.title || "Company", 
      path: '/company-management',
      icon: Building
    },
    {
      name: t.settings?.title || "Settings",
      path: '/settings',
      icon: Settings
    }
  ];
  
  // For non-authenticated users or mobile view
  if (!user) {
    return (
      <Sidebar variant={isMobile ? "floating" : "sidebar"}>
        <SidebarHeader className="px-4">
          <div className="flex items-center space-x-2 py-4">
            <img src="/logo.svg" alt="Offersrv Logo" className="h-6" />
            <span className="font-bold text-xl">Offersrv</span>
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
    <Sidebar variant={isMobile ? "floating" : "sidebar"} collapsible={isMobile ? "none" : "offcanvas"}>
      <SidebarHeader className="px-4">
        <div className="flex items-center space-x-2 py-4">
          <img src="/logo.svg" alt="Offersrv Logo" className="h-6" />
          <span className="font-bold text-xl">Offersrv</span>
        </div>
        
        {/* Company indicator - simplified from selector */}
        {selectedCompanyId && (
          <div className="mt-4 mb-2 px-4 py-2 bg-primary/10 rounded-md truncate">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-primary" />
              <span className="text-sm">{t.company.usingRegisteredCompany}</span>
            </div>
          </div>
        )}
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
