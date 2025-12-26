-- Query para verificar se a tabela voucher está de acordo com o modelo

-- 1. Verificar a estrutura da tabela voucher
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'voucher'
ORDER BY ordinal_position;

-- 2. Verificar se a coluna discount_percentage existe
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'voucher' 
  AND column_name = 'discount_percentage';

-- 3. Verificar se ainda existe a coluna antiga discount_points (não deveria existir)
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'voucher' 
  AND column_name = 'discount_points';

-- 4. Ver os vouchers existentes e seus valores
SELECT 
    id,
    code,
    discount_percentage,
    client_cpf_cnpj,
    is_active,
    is_used,
    expires_at,
    created_at
FROM voucher
ORDER BY created_at DESC
LIMIT 10;

-- 5. Verificar constraints da tabela
SELECT
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'voucher'
ORDER BY tc.constraint_type, tc.constraint_name;
