import { supabase } from '../lib/supabase'

export type WorkoutItem = {
  id: string
  workout_block_id: string
  exercise_id: string
  selected_video_id: string | null
  sets: string | null
  reps: string | null
  load_target: string | null
  notes: string | null
  order_index: number
  exercises: {
    id: string
    name: string
  }
}

export type UpdateWorkoutItemData = {
  sets: string
  reps: string
  loadTarget: string
  notes: string
}

export async function getWorkoutItemsByBlocks(blockIds: string[]) {
  if (blockIds.length === 0) {
    return []
  }

  const { data, error } = await supabase
    .from('workout_items')
    .select(`
      *,
      exercises (
        id,
        name
      )
    `)
    .in('workout_block_id', blockIds)
    .order('order_index')

  if (error) throw error

  return data as WorkoutItem[]
}

export async function createWorkoutItem(
  workoutBlockId: string,
  exerciseName: string,
  orderIndex: number,
) {
  const { data: exercise, error: exerciseError } = await supabase
    .from('exercises')
    .insert({
      name: exerciseName,
    })
    .select('id, name')
    .single()

  if (exerciseError) throw exerciseError

  const { data, error } = await supabase
    .from('workout_items')
    .insert({
      workout_block_id: workoutBlockId,
      exercise_id: exercise.id,
      order_index: orderIndex,
    })
    .select(`
      *,
      exercises (
        id,
        name
      )
    `)
    .single()

  if (error) throw error

  return data as WorkoutItem
}

export async function updateWorkoutItem(
  itemId: string,
  values: UpdateWorkoutItemData,
) {
  const { data, error } = await supabase
    .from('workout_items')
    .update({
      sets: values.sets || null,
      reps: values.reps || null,
      load_target: values.loadTarget || null,
      notes: values.notes || null,
    })
    .eq('id', itemId)
    .select(`
      *,
      exercises (
        id,
        name
      )
    `)
    .single()

  if (error) throw error

  return data as WorkoutItem
}