import { supabase } from '../lib/supabase'

export type WorkoutDay = {
  id: string
  workout_week_id: string
  day_of_week: string
  title: string | null
  order_index: number
}

const defaultDays = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
]

export async function getOrCreateWorkoutDays(weekId: string) {
  const { data: existingDays, error: selectError } = await supabase
    .from('workout_days')
    .select('*')
    .eq('workout_week_id', weekId)
    .order('order_index')

  if (selectError) throw selectError

  if (existingDays && existingDays.length > 0) {
    return existingDays as WorkoutDay[]
  }

  const daysToInsert = defaultDays.map((day, index) => ({
    workout_week_id: weekId,
    day_of_week: day,
    title: day,
    order_index: index + 1,
  }))

  const { data, error } = await supabase
    .from('workout_days')
    .insert(daysToInsert)
    .select('*')
    .order('order_index')

  if (error) throw error

  return data as WorkoutDay[]
}