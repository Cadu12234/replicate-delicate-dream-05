import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, User, LogOut } from 'lucide-react';

interface WaitingApprovalProps {
  user: any;
  onLogout: () => void;
}

const WaitingApproval = ({ user, onLogout }: WaitingApprovalProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-md mx-2 sm:mx-0">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
          </div>
          <CardTitle className="text-lg sm:text-xl">Aguardando Aprovação</CardTitle>
          <CardDescription className="text-sm">
            Sua conta foi criada com sucesso e está sendo analisada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="text-sm">{user?.name}</span>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Um gestor irá revisar e aprovar sua conta em breve. 
                Você receberá um email quando sua conta estiver aprovada.
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitingApproval;