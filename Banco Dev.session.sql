-- Tornar franchise_id nullable na tabela voucher
ALTER TABLE voucher 
ALTER COLUMN franchise_id DROP NOT NULL;