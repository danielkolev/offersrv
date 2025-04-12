
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LoadingErrorStatesProps {
  isLoading: boolean;
  hasError: boolean;
}

const LoadingErrorStates: React.FC<LoadingErrorStatesProps> = ({
  isLoading,
  hasError
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-4">
        {t?.common?.loading || "Loading..."}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-4 text-red-500">
        {t?.common?.error || "Error"}
      </div>
    );
  }

  return null;
};

export default LoadingErrorStates;
