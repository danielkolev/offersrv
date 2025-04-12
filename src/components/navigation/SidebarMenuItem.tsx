
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SidebarMenuItem as SidebarMenuItemUI, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';

interface SidebarMenuItemProps {
  path: string;
  name: string;
  icon: LucideIcon;
  isActive: boolean;
}

const SidebarMenuItem = ({ path, name, icon: Icon, isActive }: SidebarMenuItemProps) => {
  return (
    <SidebarMenuItemUI>
      <SidebarMenuButton 
        asChild
        isActive={isActive}
        tooltip={name}
      >
        <Link to={path}>
          <Icon className="mr-2 h-4 w-4" />
          <span>{name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItemUI>
  );
};

export default SidebarMenuItem;
