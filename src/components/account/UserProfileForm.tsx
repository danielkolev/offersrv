
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const profileFormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const UserProfileForm = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      email: user?.email || '',
      firstName: user?.user_metadata?.first_name || '',
      lastName: user?.user_metadata?.last_name || '',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: data.email,
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      });

      if (error) throw error;

      toast({
        title: t.user.updateSuccess,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t.user.updateError,
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.user.firstName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.user.lastName}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.user.email}</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">{t.user.save}</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
