import { useEffect, useState } from 'react'

import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'

import {
  createWorkoutWeek,
  getWorkoutWeeks,
} from '../../../services/workoutWeekService'

type WorkoutWeek = {
  id: string
  title: string
}

export default function TrainerPage() {
  const [weeks, setWeeks] = useState<WorkoutWeek[]>([])
  const [loading, setLoading] = useState(true)

  async function loadWeeks() {
    const data = await getWorkoutWeeks()
    setWeeks(data)
    setLoading(false)
  }

  useEffect(() => {
    loadWeeks()
  }, [])

  async function handleCreateWeek() {
    const title = prompt('Nome da semana')

    if (!title) return

    await createWorkoutWeek(title)

    loadWeeks()
  }

  return (
    <Card>
      <h1>Painel do Personal</h1>

      <Button onClick={handleCreateWeek}>
        Nova Semana
      </Button>

      <br />
      <br />

      {loading && <p>Carregando...</p>}

      {weeks.map((week) => (
        <Card key={week.id}>
          {week.title}
        </Card>
      ))}
    </Card>
  )
}