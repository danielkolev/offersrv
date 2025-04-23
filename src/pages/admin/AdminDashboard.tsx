
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, User, FileText, Briefcase, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdminStats {
  totalUsers: number;
  totalOffers: number;
  totalClients: number;
  totalProducts: number;
}

interface RecentUser {
  id: string;
  email: string;
  created_at: string;
  first_name?: string;
  last_name?: string;
}

interface RecentOffer {
  id: string;
  created_at: string;
  user_id: string;
  name?: string;
  status?: string;
}

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalOffers: 0,
    totalClients: 0,
    totalProducts: 0
  });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentOffers, setRecentOffers] = useState<RecentOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Извличаме общия брой потребители
      const { count: userCount, error: userError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Извличаме общия брой оферти
      const { count: offerCount, error: offerError } = await supabase
        .from('saved_offers')
        .select('*', { count: 'exact', head: true });

      // Извличаме общия брой клиенти
      const { count: clientCount, error: clientError } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });

      // Извличаме общия брой продукти
      const { count: productCount, error: productError } = await supabase
        .from('saved_products')
        .select('*', { count: 'exact', head: true });

      if (userError || offerError || clientError || productError) {
        throw new Error('Error fetching stats');
      }

      setStats({
        totalUsers: userCount || 0,
        totalOffers: offerCount || 0,
        totalClients: clientCount || 0,
        totalProducts: productCount || 0
      });

      // Извличаме последните регистрирани потребители
      const { data: users, error: recentUsersError } = await supabase
        .from('profiles')
        .select('id, email, created_at, first_name, last_name')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentUsersError) throw new Error('Error fetching recent users');
      setRecentUsers(users || []);

      // Извличаме последните създадени оферти
      const { data: offers, error: recentOffersError } = await supabase
        .from('saved_offers')
        .select('id, created_at, user_id, name, status')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentOffersError) throw new Error('Error fetching recent offers');
      setRecentOffers(offers || []);

    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      toast({
        title: 'Грешка при зареждане на данните',
        description: 'Опитайте отново по-късно',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Административно Табло</h1>
      
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p>Зареждане...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Общо Потребители</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Общо Оферти</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-500" />
                  <p className="text-2xl font-bold">{stats.totalOffers}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Общо Клиенти</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-500" />
                  <p className="text-2xl font-bold">{stats.totalClients}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Общо Продукти</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-amber-500" />
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="mb-8">
            <TabsList>
              <TabsTrigger value="users">Последни Потребители</TabsTrigger>
              <TabsTrigger value="offers">Последни Оферти</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Последно Регистрирани Потребители</CardTitle>
                  <CardDescription>Последните 5 регистрирани потребители в системата</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Име</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Регистриран на</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.length > 0 ? (
                        recentUsers.map(user => (
                          <TableRow key={user.id}>
                            <TableCell>
                              {user.first_name && user.last_name ? 
                                `${user.first_name} ${user.last_name}` : 
                                'Няма име'}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center">
                            Няма регистрирани потребители
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="offers">
              <Card>
                <CardHeader>
                  <CardTitle>Последно Създадени Оферти</CardTitle>
                  <CardDescription>Последните 5 създадени оферти в системата</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Име</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Създадена на</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOffers.length > 0 ? (
                        recentOffers.map(offer => (
                          <TableRow key={offer.id}>
                            <TableCell>{offer.name || 'Без име'}</TableCell>
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
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center">
                            Няма създадени оферти
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
