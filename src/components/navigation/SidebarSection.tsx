
import React from 'react';
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu
} from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';
import SidebarMenuItem from './SidebarMenuItem';

interface SidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface SidebarSectionProps {
  title?: string;
  items: SidebarItem[];
  isItemActive: (path: string) => boolean;
}

const SidebarSection = ({ title, items, isItemActive }: SidebarSectionProps) => {
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.path}
              path={item.path}
              name={item.name}
              icon={item.icon}
              isActive={isItemActive(item.path)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarSection;
