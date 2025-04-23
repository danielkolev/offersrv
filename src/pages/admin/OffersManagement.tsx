
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Search, Eye, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OfferData {
  id: string;
  name?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  status?: string;
  offer_data: any;
  user_email?: string;
  user_name?: string;
}

const OffersManagement = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [offers, setOffers] = useState<OfferData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferData | null>(null);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      // Първо извличаме всички оферти
      const { data: offersData, error: offersError } = await supabase
        .from('saved_offers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (offersError) throw offersError;
      
      if (!offersData || offersData.length === 0) {
        setOffers([]);
        return;
      }
      
      // Извличаме информация за потребителите
      const userIds = [...new Set(offersData.map(offer => offer.user_id))];
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name')
        .in('id', userIds);
      
      if (usersError) throw usersError;
      
      // Обединяваме информацията
      const offersWithUserInfo = offersData.map(offer => {
        const user = usersData?.find(u => u.id === offer.user_id);
        return {
          ...offer,
          user_email: user?.email || 'Unknown',
          user_name: user?.first_name && user?.last_name ? 
            `${user.first_name} ${user.last_name}` : 'Unknown'
        };
      });
      
      setOffers(offersWithUserInfo);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: 'Грешка при зареждане на офертите',
        description: 'Опитайте отново по-късно',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewOffer = (offer: OfferData) => {
    setSelectedOffer(offer);
    setIsViewDialogOpen(true);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const filteredOffers = offers.filter(offer => {
    const nameMatch = (offer.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const userNameMatch = (offer.user_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const userEmailMatch = (offer.user_email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const offerNumberMatch = offer.offer_data?.details?.offerNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || offer.status === statusFilter;
    
    return statusMatch && (nameMatch || userNameMatch || userEmailMatch || offerNumberMatch);
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Управление на Оферти</h1>
        
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Търсене по име или потребител" 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-3" 
                onClick={() => setSearchTerm('')}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Филтър по статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всички</SelectItem>
              <SelectItem value="draft">Чернова</SelectItem>
              <SelectItem value="saved">Запазена</SelectItem>
              <SelectItem value="sent">Изпратена</SelectItem>
              <SelectItem value="accepted">Приета</SelectItem>
              <SelectItem value="rejected">Отхвърлена</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Оферти</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p>Зареждане...</p>
            </div>
          ) : (
            <>
              {filteredOffers.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Номер</TableHead>
                        <TableHead>Име</TableHead>
                        <TableHead>Потребител</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Създадена на</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOffers.map(offer => (
                        <TableRow key={offer.id}>
                          <TableCell>
                            {offer.offer_data?.details?.offerNumber || 'N/A'}
                          </TableCell>
                          <TableCell>
                            {offer.name || 'Без име'}
                          </TableCell>
                          <TableCell>{offer.user_email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              offer.status === 'draft' ? 'bg-gray-200 text-gray-800' :
                              offer.status === 'saved' ? 'bg-blue-100 text-blue-800' :
                              offer.status === 'sent' ? 'bg-green-100 text-green-800' :
                              offer.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                              offer.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {offer.status || 'Неизвестен'}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(offer.created_at).toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="icon" onClick={() => handleViewOffer(offer)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <h3 className="mt-2 text-lg font-medium">Няма намерени оферти</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm || statusFilter !== 'all' ? 'Опитайте с различни филтри за търсене' : 'Все още няма създадени оферти'}
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Диалог за преглед на оферта */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Преглед на оферта {selectedOffer?.offer_data?.details?.offerNumber}</DialogTitle>
          </DialogHeader>
          
          {selectedOffer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Основна информация</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Създадена от:</span> {selectedOffer.user_name} ({selectedOffer.user_email})</p>
                    <p><span className="font-medium">Създадена на:</span> {new Date(selectedOffer.created_at).toLocaleString()}</p>
                    <p><span className="font-medium">Последна промяна:</span> {new Date(selectedOffer.updated_at).toLocaleString()}</p>
                    <p><span className="font-medium">Статус:</span> {selectedOffer.status || 'Не е зададен'}</p>
                  </div>
                </div>
                
                {selectedOffer.offer_data?.client && (
                  <div>
                    <h3 className="font-semibold mb-2">Информация за клиента</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Име:</span> {selectedOffer.offer_data.client.name || 'Не е зададено'}</p>
                      <p><span className="font-medium">ДДС номер:</span> {selectedOffer.offer_data.client.vatNumber || 'Не е зададен'}</p>
                      <p><span className="font-medium">Адрес:</span> {selectedOffer.offer_data.client.address || 'Не е зададен'}</p>
                      <p><span className="font-medium">Имейл:</span> {selectedOffer.offer_data.client.email || 'Не е зададен'}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedOffer.offer_data?.products && selectedOffer.offer_data.products.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Продукти</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Име</TableHead>
                        <TableHead>Количество</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead className="text-right">Общо</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOffer.offer_data.products.map((product: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.quantity} {product.unit || 'бр'}</TableCell>
                          <TableCell>{product.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{(product.price * product.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedOffer.offer_data?.details && (
                  <div>
                    <h3 className="font-semibold mb-2">Детайли на офертата</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Дата на офертата:</span> {selectedOffer.offer_data.details.offerDate}</p>
                      <p><span className="font-medium">Валидна до:</span> {selectedOffer.offer_data.details.validUntil}</p>
                      {selectedOffer.offer_data.details.notes && (
                        <p><span className="font-medium">Бележки:</span> {selectedOffer.offer_data.details.notes}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {selectedOffer.offer_data?.totals && (
                  <div>
                    <h3 className="font-semibold mb-2">Суми</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Сума без ДДС:</span> {selectedOffer.offer_data.totals.subtotal?.toFixed(2) || '0.00'}</p>
                      <p><span className="font-medium">ДДС:</span> {selectedOffer.offer_data.totals.vat?.toFixed(2) || '0.00'}</p>
                      <p><span className="font-medium">Общо:</span> {selectedOffer.offer_data.totals.total?.toFixed(2) || '0.00'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsViewDialogOpen(false)}>
              Затвори
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OffersManagement;
