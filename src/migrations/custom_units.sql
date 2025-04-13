
-- Create the custom_units table to store user-defined measurement units

CREATE TABLE IF NOT EXISTS custom_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_custom_units_user_id ON custom_units(user_id);

-- Create RLS policies
ALTER TABLE custom_units ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to select their own custom units
CREATE POLICY select_own_units ON custom_units 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy to allow users to insert their own custom units
CREATE POLICY insert_own_units ON custom_units 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own custom units
CREATE POLICY update_own_units ON custom_units 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy to allow users to delete their own custom units
CREATE POLICY delete_own_units ON custom_units 
  FOR DELETE USING (auth.uid() = user_id);
