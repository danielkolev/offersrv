
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, LayoutDashboard, Users, FileText, User, LogOut, Menu, X, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast({
        title: 'Успешно излязохте от системата',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Грешка при излизане',
        variant: 'destructive'
      });
    }
  };
  
  const navItems = [
    { name: 'Табло', path: '/admin', icon: <LayoutDashboard className="mr-2 h-5 w-5" /> },
    { name: 'Потребители', path: '/admin/users', icon: <Users className="mr-2 h-5 w-5" /> },
    { name: 'Оферти', path: '/admin/offers', icon: <FileText className="mr-2 h-5 w-5" /> },
    { name: 'Клиенти', path: '/admin/clients', icon: <User className="mr-2 h-5 w-5" /> },
    { name: 'Настройки', path: '/admin/settings', icon: <Settings className="mr-2 h-5 w-5" /> },
  ];
  
  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("min-w-60 bg-slate-50 border-r h-screen px-4 py-6 flex flex-col", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-offer-blue">Admin Panel</h2>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-offer-blue text-white" 
                  : "text-gray-700 hover:bg-gray-200"
              )
            }
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <NavLink
          to="/dashboard"
          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <ChevronDown className="mr-2 h-5 w-5 rotate-90" />
          Обратно към сайта
        </NavLink>
        
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Изход
        </Button>
      </div>
    </div>
  );
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-40"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      <aside 
        className={cn(
          "md:hidden fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar />
      </aside>
      
      {/* Desktop sidebar */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
