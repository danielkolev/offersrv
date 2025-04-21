
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogoGoogle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const GoogleAuthButton: React.FC<{ text: string }> = ({ text }) => {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <Button
      variant="outline"
      className="w-full gap-2 bg-white hover:bg-gray-50 border text-gray-800 font-medium shadow-sm hover:shadow"
      onClick={handleGoogleLogin}
      type="button"
    >
      <LogoGoogle size={18} className="text-red-500" />
      {text}
    </Button>
  );
};

export default GoogleAuthButton;
