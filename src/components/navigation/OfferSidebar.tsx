
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
import { 
  BookmarkIcon, 
  UsersIcon, 
  PackageIcon, 
  Settings, 
  Home, 
  FileText, 
  LayoutTemplate 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const OfferSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const mainNavItems = [
    {
      name: t.common.home,
      path: '/',
      icon: Home
    }
  ];
  
  const managementNavItems = [
    {
      name: t.savedOffers.title,
      path: '/saved-offers',
      icon: BookmarkIcon
    },
    {
      name: t.savedClients.title,
      path: '/saved-clients',
      icon: UsersIcon
    },
    {
      name: t.savedProducts.title,
      path: '/saved-products',
      icon: PackageIcon
    }
  ];
  
  const templatesNavItems = [
    {
      name: t.offer.templates.title,
      path: '/templates',
      icon: LayoutTemplate
    }
  ];
  
  const settingsNavItems = [
    {
      name: t.settings.title,
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
                      <span>{t.common.home}</span>
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
      </SidebarHeader>
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Management Section */}
        <SidebarGroup>
          <SidebarGroupLabel>{t.common.manageAccount}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Templates Section */}
        <SidebarGroup>
          <SidebarGroupLabel>{t.offer.templates.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {templatesNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Settings Section */}
        <SidebarGroup>
          <SidebarGroupLabel>{t.settings.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={isActive(item.path)}
                    tooltip={item.name}
                  >
                    <Link to={item.path}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
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
