-- Remover qualquer constraint existente primeiro
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_urgency_check;

-- Atualizar dados para valores consistentes
UPDATE public.orders 
SET status = 'entregue' 
WHERE status = 'delivered';

UPDATE public.orders 
SET urgency = 'alta' 
WHERE urgency = 'high';

UPDATE public.orders 
SET urgency = 'media' 
WHERE urgency = 'medium';

-- Adicionar constraints com valores corretos
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

ALTER TABLE public.orders ADD CONSTRAINT orders_urgency_check 
CHECK (urgency IN (
  'normal',
  'media', 
  'alta',
  'critica'
));