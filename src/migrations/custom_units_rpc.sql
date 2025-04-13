
-- Create RPC function to get custom units for a user
CREATE OR REPLACE FUNCTION public.get_custom_units(user_id_param UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  name_en TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    custom_units.id,
    custom_units.name,
    custom_units.name_en,
    custom_units.created_at,
    custom_units.updated_at
  FROM public.custom_units
  WHERE custom_units.user_id = user_id_param;
END;
$$;

-- Create RPC function to add a custom unit
CREATE OR REPLACE FUNCTION public.add_custom_unit(
  user_id_param UUID,
  name_param TEXT,
  name_en_param TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO public.custom_units (user_id, name, name_en)
  VALUES (user_id_param, name_param, name_en_param)
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$;

-- Create RPC function to delete a custom unit
CREATE OR REPLACE FUNCTION public.delete_custom_unit(
  unit_id_param UUID,
  user_id_param UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  rows_affected INT;
BEGIN
  DELETE FROM public.custom_units
  WHERE id = unit_id_param AND user_id = user_id_param
  RETURNING 1 INTO rows_affected;
  
  RETURN FOUND;
END;
$$;
