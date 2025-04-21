
import React from "react";
import { FileText } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher";

const LandingHeader = () => (
  <header className="w-full bg-white border-b shadow-sm sticky top-0 z-40">
    <div className="container flex flex-row items-center justify-between h-16 px-2 md:px-0">
      <div className="flex items-center gap-2">
        <FileText className="h-7 w-7 text-blue-600" />
        <span className="font-extrabold text-xl md:text-2xl text-gray-900 tracking-tight select-none">
          Offersrv
        </span>
      </div>
      <LanguageSwitcher />
    </div>
  </header>
);

export default LandingHeader;
