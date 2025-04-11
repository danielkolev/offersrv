
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle, Circle } from 'lucide-react';

export type WizardStep = {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
};

interface OfferWizardStepsProps {
  steps: WizardStep[];
  currentStepIndex: number;
  progress: number;
}

const OfferWizardSteps = ({ steps, currentStepIndex, progress }: OfferWizardStepsProps) => {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <Progress value={progress} className="h-2 mb-4" />
      
      {/* Steps Indicators */}
      <div className="flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
              step.current 
                ? 'bg-offer-blue text-white' 
                : step.completed 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
            }`}>
              {step.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <Circle className={`w-6 h-6 ${step.current ? 'text-white' : ''}`} />
              )}
            </div>
            <div className={`text-sm font-medium ${
              step.current 
                ? 'text-offer-blue' 
                : step.completed 
                  ? 'text-green-600' 
                  : 'text-gray-400'
            }`}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferWizardSteps;
