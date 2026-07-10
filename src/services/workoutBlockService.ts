import { supabase } from '../lib/supabase'

export type WorkoutBlock = {
  id: string
  workout_day_id: string
  title: string
  description: string | null
  order_index: number

  
}

export async function getWorkoutBlocksByWeek(weekId: string) {
  const { data, error } = await supabase
    .from('workout_blocks')
    .select(`
      *,
      workout_days!inner(workout_week_id)
    `)
    .eq('workout_days.workout_week_id', weekId)
    .order('order_index')

  if (error) throw error

  return data as WorkoutBlock[]
}

export async function createWorkoutBlock(
  workoutDayId: string,
  orderIndex: number,
) {
  const { data, error } = await supabase
    .from('workout_blocks')
    .insert({
      workout_day_id: workoutDayId,
      title: 'Novo bloco',
      order_index: orderIndex,
    })
    .select('*')
    .single()

  if (error) throw error

  return data as WorkoutBlock
}

export async function updateWorkoutBlockTitle(
  blockId: string,
  title: string,
) {
  const { data, error } = await supabase
    .from('workout_blocks')
    .update({ title })
    .eq('id', blockId)
    .select('*')
    .single()

  if (error) throw error

  return data as WorkoutBlock
}