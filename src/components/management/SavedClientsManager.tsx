
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';
import { ClientInfo } from '@/types/offer';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Save, Trash2, Loader2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SavedClientsManager = () => {
  const { user } = useAuth();
  const { offer, updateClientInfo } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'vat'>('name');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && open) {
      fetchClients();
    }
  }, [user, open]);

  const fetchClients = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      setClients(data || []);
    } catch (error: any) {
      console.error('Error fetching clients:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveClient = async () => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive',
      });
      return;
    }
    
    // Check if client already exists
    const existingClient = clients.find(
      client => client.vat_number === offer.client.vatNumber
    );
    
    if (existingClient) {
      // Update existing client
      updateExistingClient(existingClient.id);
      return;
    }
    
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('clients')
        .insert({
          user_id: user.id,
          name: offer.client.name,
          contact_person: offer.client.contactPerson,
          address: offer.client.address,
          city: offer.client.city,
          country: offer.client.country,
          vat_number: offer.client.vatNumber,
          email: offer.client.email,
          phone: offer.client.phone,
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      setClients(prev => [...prev, data[0]].sort((a, b) => a.name.localeCompare(b.name)));
      toast({
        title: t.common.success,
        description: 'Client saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving client:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const updateExistingClient = async (id: string) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('clients')
        .update({
          name: offer.client.name,
          contact_person: offer.client.contactPerson,
          address: offer.client.address,
          city: offer.client.city,
          country: offer.client.country,
          vat_number: offer.client.vatNumber,
          email: offer.client.email,
          phone: offer.client.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setClients(prev => 
        prev.map(client => 
          client.id === id 
            ? {
                ...client,
                name: offer.client.name,
                contact_person: offer.client.contactPerson,
                address: offer.client.address,
                city: offer.client.city,
                country: offer.client.country,
                vat_number: offer.client.vatNumber,
                email: offer.client.email,
                phone: offer.client.phone,
                updated_at: new Date().toISOString(),
              }
            : client
        )
      );
      
      toast({
        title: t.common.success,
        description: 'Client updated successfully',
      });
    } catch (error: any) {
      console.error('Error updating client:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setClients(prev => prev.filter(client => client.id !== id));
      toast({
        title: t.common.success,
        description: 'Client deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting client:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const selectClient = (client: Client) => {
    const clientInfo: Partial<ClientInfo> = {
      name: client.name,
      contactPerson: client.contact_person || '',
      address: client.address || '',
      city: client.city || '',
      country: client.country || '',
      vatNumber: client.vat_number || '',
      email: client.email || '',
      phone: client.phone || '',
    };
    
    updateClientInfo(clientInfo);
    setOpen(false);
    
    toast({
      title: t.common.success,
      description: 'Client loaded successfully',
    });
  };

  const filteredClients = clients.filter(client => {
    if (searchType === 'name') {
      return client.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return client.vat_number?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            {t.savedClients.title}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.savedClients.title}</DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <div className="flex gap-2 my-4">
              <Button 
                onClick={saveClient} 
                className="gap-2"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                {t.savedClients.addClient}
              </Button>
            </div>
            
            <Tabs defaultValue="name" value={searchType} onValueChange={(value) => setSearchType(value as 'name' | 'vat')}>
              <TabsList className="mb-4">
                <TabsTrigger value="name">{t.savedClients.searchByName}</TabsTrigger>
                <TabsTrigger value="vat">{t.savedClients.searchByVat}</TabsTrigger>
              </TabsList>
              
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.savedClients.searchPlaceholder}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Tabs>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-offer-blue" />
              </div>
            ) : filteredClients.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t.savedClients.noClientsFound}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.client.name}</TableHead>
                    <TableHead>{t.client.vatNumber}</TableHead>
                    <TableHead>{t.client.contactPerson}</TableHead>
                    <TableHead className="text-right">{t.common.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.vat_number || '-'}</TableCell>
                      <TableCell>{client.contact_person || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => selectClient(client)}
                          >
                            {t.savedClients.selectClient}
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t.savedClients.deleteConfirmation}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => deleteClient(client.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {t.common.delete}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t.common.close}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SavedClientsManager;
