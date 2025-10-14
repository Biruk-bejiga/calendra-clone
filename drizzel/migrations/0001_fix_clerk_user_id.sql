-- Migration: change clerk_user_id from boolean to text so Clerk user IDs (strings) can be stored
-- Back up existing data first if you care about current boolean values
BEGIN;

-- Create a temporary column with text type
ALTER TABLE public.events ADD COLUMN clerk_user_id_text text;

-- Populate the text column by casting the boolean values to text. If current values are 't'/'f', they will become 't'/'f'.
-- If you prefer NULL for legacy boolean values, set them to NULL afterwards.
UPDATE public.events SET clerk_user_id_text = clerk_user_id::text;

-- Drop the old boolean column
ALTER TABLE public.events DROP COLUMN clerk_user_id;

-- Rename the new column to the original name
ALTER TABLE public.events RENAME COLUMN clerk_user_id_text TO clerk_user_id;

COMMIT;
