
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MainSidebar from './MainSidebar';
import NavbarUtilities from './NavbarUtilities';
import { useAuth } from '@/context/AuthContext';

interface MobileNavToggleProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileNavToggle = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavToggleProps) => {
  const { user } = useAuth();
  
  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[80%] max-w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <p className="font-bold text-lg">Offersrv</p>
          </div>
          <div className="flex-1 overflow-auto">
            <MainSidebar isMobile={true} />
          </div>
          {user && (
            <div className="border-t p-4">
              <div className="flex flex-col gap-3">
                <NavbarUtilities isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} showInMobile={true} />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavToggle;
