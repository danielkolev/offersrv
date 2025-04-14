
import React from 'react';
import OfferSidebar from './OfferSidebar';

interface MainSidebarProps {
  isMobile?: boolean;
}

const MainSidebar = ({ isMobile = false }: MainSidebarProps) => {
  return <OfferSidebar isMobile={isMobile} />;
};

export default MainSidebar;
