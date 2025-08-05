import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, UserCheck, Package, LogOut, User } from 'lucide-react';

interface PendingApprovalProps {
  user: any;
  onLogout: () => void;
  onBack: () => void;
}

const PendingApproval = ({ user, onLogout, onBack }: PendingApprovalProps) => {
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .is('role', null)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPendingUsers(data || []);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar usuários pendentes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const approveUser = async (userId: string, role: 'engineer' | 'manager') => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Usuário aprovado!",
        description: `Usuário aprovado como ${role === 'engineer' ? 'Engenheiro' : 'Gestor'}.`,
      });

      fetchPendingUsers();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao aprovar usuário.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-teal-600 rounded flex items-center justify-center">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Sistema de Pedidos</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Materiais de Construção</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[100px] sm:max-w-none">{user.name}</span>
                <span className="text-xs bg-gray-100 px-1 sm:px-2 py-1 rounded text-gray-600 hidden sm:inline">Gestor</span>
              </div>
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Aprovação de Usuários</h2>
          <p className="text-sm sm:text-base text-gray-600">Gerencie novos usuários aguardando aprovação</p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <p>Carregando usuários...</p>
          </div>
        ) : pendingUsers.length === 0 ? (
          <Card className="p-8 text-center">
            <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum usuário pendente</h3>
            <p className="text-gray-600">Todos os usuários foram aprovados.</p>
          </Card>
        ) : (
          <div className="grid gap-3 sm:gap-4 max-w-2xl">
            {pendingUsers.map((pendingUser) => (
              <Card key={pendingUser.id} className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{pendingUser.name}</h3>
                    <p className="text-gray-600">{pendingUser.email}</p>
                    <p className="text-sm text-gray-500">
                      Cadastrado em {new Date(pendingUser.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    Aguardando Aprovação
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    onClick={() => approveUser(pendingUser.id, 'engineer')}
                    variant="outline"
                    className="flex items-center justify-center space-x-2 text-sm"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Aprovar como Engenheiro</span>
                    <span className="sm:hidden">Engenheiro</span>
                  </Button>
                  <Button
                    onClick={() => approveUser(pendingUser.id, 'manager')}
                    className="flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white text-sm"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span className="hidden sm:inline">Aprovar como Gestor</span>
                    <span className="sm:hidden">Gestor</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApproval;