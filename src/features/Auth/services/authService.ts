import { supabase } from '../../../lib/supabase'

type RegisterData = {
  email: string
  password: string
  fullName: string
}

type LoginData = {
  email: string
  password: string
}

export async function register({ email, password, fullName }: RegisterData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) throw error

  return data
}

export async function login({ email, password }: LoginData) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) throw error
}
