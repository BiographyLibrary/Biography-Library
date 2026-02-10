import { supabase } from './supabase';

export async function getFreshAccessToken(): Promise<string | null> {
  const { data: { session }, error } = await supabase.auth.refreshSession();

  if (error) {
    console.error('Session refresh error:', error);
    return null;
  }

  return session?.access_token || null;
}

export async function ensureValidSession(): Promise<string> {
  const token = await getFreshAccessToken();

  if (!token) {
    throw new Error('No valid session found. Please refresh the page and try again.');
  }

  return token;
}
