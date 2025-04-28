
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Search, Edit, Trash, X } from 'lucide-react';
import { UserRole } from '@/types/user';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

interface UserData {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: UserRole;
  created_at: string;
  avatar_url?: string;
}

const UsersManagement = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    role: '' as UserRole
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const typedData = data?.map(user => ({
        ...user,
        role: (user.role || 'user') as UserRole
      })) || [];
      
      setUsers(typedData);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Грешка при зареждане на потребителите',
        description: 'Опитайте отново по-късно',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setEditForm({
      firstName: user.first_name || '',
      lastName: user.last_name || '',
      role: user.role || 'user'
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const saveUserChanges = async () => {
    if (!selectedUser) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editForm.firstName,
          last_name: editForm.lastName,
          role: editForm.role
        })
        .eq('id', selectedUser.id);
      
      if (error) throw error;
      
      toast({
        title: 'Потребителят е обновен успешно',
      });
      
      setIsEditDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Грешка при обновяване на потребителя',
        description: 'Опитайте отново по-късно',
        variant: 'destructive'
      });
    }
  };

  const deleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', selectedUser.id);
      
      if (profileError) throw profileError;
      
      const { error: authError } = await supabase.auth.admin.deleteUser(selectedUser.id);
      
      if (authError) throw authError;
      
      toast({
        title: 'Потребителят е изтрит успешно',
      });
      
      setIsDeleteDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Грешка при изтриване на потребителя',
        description: 'Възможно е да нямате достатъчно права или да възникна грешка',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    const email = user.email?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    
    return fullName.includes(term) || email.includes(term);
  });

  // Рендериране на потребител като карта за мобилни устройства
  const renderUserCard = (user: UserData) => (
    <Card key={user.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">
                {user.first_name && user.last_name ? 
                  `${user.first_name} ${user.last_name}` : 
                  'Няма име'}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {user.role === 'admin' ? 'Администратор' : 'Потребител'}
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Регистриран на: {new Date(user.created_at).toLocaleString()}
          </div>
          
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
              <Edit className="h-4 w-4 mr-1" />
              Редактирай
            </Button>
            <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteUser(user)}>
              <Trash className="h-4 w-4 mr-1" />
              Изтрий
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Управление на Потребители</h1>
        
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Търсене по име или имейл" 
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
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Потребители</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <p>Зареждане...</p>
            </div>
          ) : (
            <>
              {filteredUsers.length > 0 ? (
                isMobile ? (
                  // Мобилен изглед с карти вместо таблица
                  <div className="space-y-4">
                    {filteredUsers.map(renderUserCard)}
                  </div>
                ) : (
                  // Таблица за десктоп с хоризонтално скролване
                  <ScrollArea className="w-full">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Име</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Роля</TableHead>
                            <TableHead>Регистриран на</TableHead>
                            <TableHead className="text-right">Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map(user => (
                            <TableRow key={user.id}>
                              <TableCell>
                                {user.first_name && user.last_name ? 
                                  `${user.first_name} ${user.last_name}` : 
                                  'Няма име'}
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {user.role === 'admin' ? 'Администратор' : 'Потребител'}
                                </span>
                              </TableCell>
                              <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="icon" onClick={() => handleEditUser(user)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="icon" onClick={() => handleDeleteUser(user)}>
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </ScrollArea>
                )
              ) : (
                <div className="text-center py-8">
                  <User className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                  <h3 className="mt-2 text-lg font-medium">Няма намерени потребители</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {searchTerm ? 'Опитайте с различна дума за търсене' : 'Все още няма регистрирани потребители'}
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Диалог за редактиране на потребител */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактиране на потребител</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                Име
              </Label>
              <Input
                id="firstName"
                value={editForm.firstName}
                onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Фамилия
              </Label>
              <Input
                id="lastName"
                value={editForm.lastName}
                onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Роля
              </Label>
              <Select
                value={editForm.role}
                onValueChange={(value) => setEditForm({...editForm, role: value as UserRole})}
              >
                <SelectTrigger id="role" className="col-span-3">
                  <SelectValue placeholder="Избери роля" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Потребител</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsEditDialogOpen(false)}>
              Отказ
            </Button>
            <Button onClick={saveUserChanges}>
              Запази
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Диалог за потвърждение на изтриване */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Сигурни ли сте?</AlertDialogTitle>
            <AlertDialogDescription>
              Това действие ще изтрие потребителя и всички свързани с него данни. Действието не може да бъде отменено.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отказ</AlertDialogCancel>
            <AlertDialogAction onClick={deleteUser} className="bg-red-500 hover:bg-red-600">
              Изтрий
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UsersManagement;
