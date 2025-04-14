
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MainSidebar from './MainSidebar';

interface MobileNavToggleProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileNavToggle = ({ isMobileMenuOpen, setIsMobileMenuOpen }: MobileNavToggleProps) => {
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
        <div className="h-full">
          <MainSidebar isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavToggle;
