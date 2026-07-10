import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Card } from '../../../shared/components/Card'

import {
  getOrCreateWorkoutDays,
  type WorkoutDay,
} from '../../../services/workoutDayService'

import {
  createWorkoutBlock,
  getWorkoutBlocksByWeek,
  type WorkoutBlock,
} from '../../../services/workoutBlockService'

export function WorkoutWeekEditorPage() {
  const { weekId } = useParams()

  const [days, setDays] = useState<WorkoutDay[]>([])
  const [blocks, setBlocks] = useState<WorkoutBlock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [creatingBlockForDayId, setCreatingBlockForDayId] = useState<
    string | null
  >(null)

  async function loadData() {
    if (!weekId) {
      return
    }

    try {
      setIsLoading(true)

      const daysData = await getOrCreateWorkoutDays(weekId)
      const blocksData = await getWorkoutBlocksByWeek(weekId)

      setDays(daysData)
      setBlocks(blocksData)
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Erro ao carregar o editor da semana.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreateBlock(dayId: string) {
    try {
      setCreatingBlockForDayId(dayId)

      const blocksFromDay = blocks.filter(
        (block) => block.workout_day_id === dayId,
      )

      await createWorkoutBlock(dayId, blocksFromDay.length + 1)

      await loadData()
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Erro ao criar o bloco.')
      }
    } finally {
      setCreatingBlockForDayId(null)
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData()
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [weekId])

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-6 py-8 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header>
          <Link
            to="/trainer"
            className="text-sm text-[#B3B3B3] transition hover:text-white"
          >
            ← Voltar para o painel
          </Link>

          <h1 className="mt-4 text-3xl font-bold">
            Editor da <span className="text-[#E5092F]">Semana</span>
          </h1>

          <p className="mt-2 text-sm text-[#B3B3B3]">
            Monte os blocos de treino de cada dia.
          </p>
        </header>

        {isLoading && (
          <Card>
            <p className="text-center text-[#B3B3B3]">
              Carregando editor...
            </p>
          </Card>
        )}

        {!isLoading && days.length === 0 && (
          <Card>
            <p className="text-center text-[#B3B3B3]">
              Nenhum dia encontrado para esta semana.
            </p>
          </Card>
        )}

        {!isLoading && days.length > 0 && (
          <div className="grid gap-4">
            {days.map((day) => {
              const dayBlocks = blocks.filter(
                (block) => block.workout_day_id === day.id,
              )

              const isCreatingBlock =
                creatingBlockForDayId === day.id

              return (
                <Card key={day.id}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">
                          {day.day_of_week}
                        </h2>

                        <p className="mt-1 text-sm text-[#B3B3B3]">
                          {dayBlocks.length === 0
                            ? 'Nenhum bloco criado.'
                            : `${dayBlocks.length} bloco(s) criado(s).`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => void handleCreateBlock(day.id)}
                        disabled={isCreatingBlock}
                        className="rounded-xl border border-[#262626] px-4 py-2 text-sm font-semibold transition hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isCreatingBlock ? 'Criando...' : '+ Bloco'}
                      </button>
                    </div>

                    {dayBlocks.length > 0 && (
                      <div className="flex flex-col gap-3">
                        {dayBlocks.map((block) => (
                          <div
                            key={block.id}
                            className="rounded-2xl border border-[#262626] bg-[#0B0B0B] p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-semibold text-[#E5092F]">
                                  {block.title}
                                </h3>

                                <p className="mt-1 text-sm text-[#B3B3B3]">
                                  Bloco #{block.order_index}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}