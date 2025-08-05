-- Remove a constraint atual que está causando erro
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Adicionar nova constraint com todos os valores de status necessários
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