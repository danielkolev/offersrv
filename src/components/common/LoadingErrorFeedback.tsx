
import React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/context/LanguageContext';

interface LoadingErrorFeedbackProps {
  isLoading: boolean;
  error: string | null;
  loadingMessage?: string;
  errorTitle?: string;
}

const LoadingErrorFeedback: React.FC<LoadingErrorFeedbackProps> = ({
  isLoading,
  error,
  loadingMessage,
  errorTitle
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
        <span className="text-muted-foreground">
          {loadingMessage || t.common.loading || "Loading..."}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{errorTitle || t.common.error || "Error"}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default LoadingErrorFeedback;
