
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User } from 'lucide-react';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  mode?: AuthMode;
}

export const AuthForm = ({ mode = 'login' }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>(mode);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        toast({ title: t.auth.loginSuccess });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) throw error;
        toast({ 
          title: t.auth.registerSuccess,
          description: t.auth.checkEmail
        });
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({ 
        title: t.auth.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  return (
    <Card className="w-full shadow-lg bg-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {authMode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}
        </CardTitle>
        <CardDescription>
          {authMode === 'login' ? t.auth.loginDescription : t.auth.registerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          {authMode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                {t.auth.name}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="name" 
                  className="pl-10"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.auth.namePlaceholder} 
                  required={authMode === 'register'}
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              {t.auth.email}
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                className="pl-10"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.auth.emailPlaceholder} 
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                {t.auth.password}
              </Label>
              {authMode === 'login' && (
                <Button variant="link" className="px-0 font-normal text-xs h-auto">
                  {t.auth.forgotPassword}
                </Button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="password" 
                type="password" 
                className="pl-10"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.auth.passwordPlaceholder} 
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-offer-blue hover:bg-blue-600" disabled={loading}>
            {loading ? t.auth.processing : (authMode === 'login' ? t.auth.loginButton : t.auth.registerButton)}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" onClick={toggleMode} className="w-full text-sm">
          {authMode === 'login' ? t.auth.needAccount : t.auth.haveAccount}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
