
import { useLanguage } from '@/context/LanguageContext';
import { 
  BookmarkIcon, 
  UsersIcon, 
  PackageIcon, 
  Settings, 
  Home, 
  LayoutTemplate 
} from 'lucide-react';

export const useSidebarNavigation = () => {
  const { t } = useLanguage();
  
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

  return {
    mainNavItems,
    managementNavItems,
    templatesNavItems,
    settingsNavItems,
    t
  };
};
