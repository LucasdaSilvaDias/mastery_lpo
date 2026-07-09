import { supabase } from '../lib/supabase'

export type Profile = {
  id: string
  full_name: string
  email: string
  role: 'athlete' | 'trainer' | 'admin'
  plan: 'free' | 'premium'
  avatar_url: string | null
  created_at: string
}

export async function getCurrentProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) throw userError
  if (!user) throw new Error('Usuário não autenticado.')

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error

  return data as Profile
}