
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const UnauthorizedState = () => {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
        <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
      </div>
    </div>
  );
};

export default UnauthorizedState;
