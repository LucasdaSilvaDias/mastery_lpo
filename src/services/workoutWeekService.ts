import { supabase } from '../lib/supabase'

export type WorkoutWeek = {
  id: string
  title: string
  week_start: string
  week_end: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
}

export async function createWorkoutWeek() {
  const today = new Date()
  const day = today.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day

  const monday = new Date(today)
  monday.setDate(today.getDate() + diffToMonday)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const weekStart = monday.toISOString().split('T')[0]
  const weekEnd = sunday.toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('workout_weeks')
    .insert({
      title: `Semana ${weekStart}`,
      week_start: weekStart,
      week_end: weekEnd,
      status: 'draft',
    })
    .select()
    .single()

  if (error) throw error

  return data as WorkoutWeek
}

export async function getWorkoutWeeks() {
  const { data, error } = await supabase
    .from('workout_weeks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data as WorkoutWeek[]
}