'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '../../../utils/supabase/server'
import bcrypt from 'bcryptjs'

// SIGN UP: Insert user with hashed password
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const hashedPassword = await bcrypt.hash(password, 10)

  const { error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword }])

  if (error) {
    console.error('Signup error:', error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

// LOGIN: Validate credentials from your users table
export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    console.error('Login fetch error:', error)
    redirect('/error')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    console.error('Invalid password')
    redirect('/error')
  }

  // You can store session info or redirect to a private route
  revalidatePath('/', 'layout')
  redirect('/private')
}
