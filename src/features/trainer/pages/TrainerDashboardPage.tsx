import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import {
  createWorkoutWeek,
  getWorkoutWeeks,
  type WorkoutWeek,
} from '../../../services/workoutWeekService'

export function TrainerDashboardPage() {
  const [weeks, setWeeks] = useState<WorkoutWeek[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)

  async function loadWeeks() {
    try {
      setIsLoading(true)
      const data = await getWorkoutWeeks()
      setWeeks(data)
    } catch (error) {
      console.error(error)
      alert('Erro ao carregar semanas.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreateWeek() {
    try {
      setIsCreating(true)
      await createWorkoutWeek()
      await loadWeeks()
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Erro ao criar semana.')
      }
    } finally {
      setIsCreating(false)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      void loadWeeks()
    }, 0)
  }, [])
  return (
    <main className="min-h-screen bg-[#0B0B0B] px-6 py-8 text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header>
          <p className="text-sm text-[#B3B3B3]">Mastery LPO</p>

          <h1 className="mt-2 text-3xl font-bold">
            Painel do <span className="text-[#E5092F]">Personal</span>
          </h1>
        </header>

        <Card>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold">Treinos da semana</h2>

              <p className="mt-1 text-sm text-[#B3B3B3]">
                Crie, edite e publique os treinos dos atletas.
              </p>
            </div>

            <Button
              type="button"
              onClick={handleCreateWeek}
              disabled={isCreating}
            >
              <span className="flex items-center justify-center gap-2">
                <Plus size={18} />
                {isCreating ? 'Criando...' : 'Nova Semana'}
              </span>
            </Button>
          </div>
        </Card>

        {isLoading && (
          <Card>
            <p className="text-center text-[#B3B3B3]">Carregando semanas...</p>
          </Card>
        )}

        {!isLoading && weeks.length === 0 && (
          <Card>
            <p className="text-center text-[#B3B3B3]">
              Nenhuma semana criada ainda.
            </p>
          </Card>
        )}

        {!isLoading &&
          weeks.map((week) => (
            <Link
              key={week.id}
              to={`/trainer/weeks/${week.id}`}
              className="block transition hover:scale-[1.01]"
            >
              <Card>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-bold">{week.title}</h3>

                    <span className="rounded-full border border-[#262626] px-3 py-1 text-xs uppercase text-[#B3B3B3]">
                      {week.status}
                    </span>
                  </div>

                  <p className="text-sm text-[#B3B3B3]">
                    {week.week_start} até {week.week_end}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
      </div>
    </main>
  )
}