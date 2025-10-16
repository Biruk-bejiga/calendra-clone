BEGIN;

-- Drop the old unique constraint that was on the boolean column
ALTER TABLE public.schedules DROP CONSTRAINT IF EXISTS schedules_clerk_user_id_key;

-- Alter the column type to text
ALTER TABLE public.schedules ALTER COLUMN clerk_user_id TYPE text USING clerk_user_id::text;

-- Add the unique constraint back on the new text column
ALTER TABLE public.schedules ADD CONSTRAINT schedules_clerk_user_id_key UNIQUE (clerk_user_id);

COMMIT;