/*
  # Fix handle_new_user trigger function

  1. Changes
    - Recreate `handle_new_user()` with explicit `search_path` set to empty
    - Use fully qualified `public.profiles` table reference
    - Add exception handler so trigger failures never block user signup

  2. Why
    - The original function had no `search_path` configuration
    - During auth operations, the default search_path may not include `public`
    - This caused "Database error saving new user" on registration
*/

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW;
END;
$$;
