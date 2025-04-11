
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AuthMode = 'login' | 'register';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
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
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}</CardTitle>
        <CardDescription>
          {mode === 'login' ? t.auth.loginDescription : t.auth.registerDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">{t.auth.name}</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder={t.auth.namePlaceholder} 
                required={mode === 'register'}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t.auth.email}</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.auth.emailPlaceholder} 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t.auth.password}</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.auth.passwordPlaceholder} 
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.auth.processing : (mode === 'login' ? t.auth.loginButton : t.auth.registerButton)}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="link" onClick={toggleMode} className="w-full">
          {mode === 'login' ? t.auth.needAccount : t.auth.haveAccount}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
