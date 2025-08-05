-- Primeiro, vamos atualizar os dados existentes para usar valores consistentes
UPDATE public.orders 
SET status = 'entregue' 
WHERE status = 'delivered';

-- Agora podemos adicionar a constraint com os valores corretos
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check 
CHECK (status IN (
  'pending',
  'approved', 
  'in_progress',
  'completed',
  'cancelled',
  'em_cotacao',
  'aguardando_aprovacao',
  'entregue'
));