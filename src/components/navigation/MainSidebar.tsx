
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { BookmarkIcon, UsersIcon, PackageIcon, Settings } from 'lucide-react';

const MainSidebar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
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
    },
    {
      name: t.settings.title,
      path: '/settings',
      icon: Settings
    }
  ];
  
  return (
    <div className="h-full w-56 border-r bg-background">
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            {t.common.manageAccount}
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive(item.path) ? "bg-accent text-accent-foreground" : "transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
