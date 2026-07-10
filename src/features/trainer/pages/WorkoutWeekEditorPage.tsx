import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Card } from '../../../shared/components/Card'

import {
  getOrCreateWorkoutDays,
  type WorkoutDay,
} from '../../../services/workoutDayService'

import {
    createWorkoutItem,
    getWorkoutItemsByBlocks,
    updateWorkoutItem,
    type WorkoutItem,
  } from '../../../services/workoutItemService'

import {
  createWorkoutBlock,
  getWorkoutBlocksByWeek,
  updateWorkoutBlockTitle,
  type WorkoutBlock,
} from '../../../services/workoutBlockService'

export function WorkoutWeekEditorPage() {
  const { weekId } = useParams()

  const [days, setDays] = useState<WorkoutDay[]>([])
  const [blocks, setBlocks] = useState<WorkoutBlock[]>([])
  const [items, setItems] = useState<WorkoutItem[]>([])

  const [isLoading, setIsLoading] = useState(true)

  const [creatingBlockForDayId, setCreatingBlockForDayId] = useState<
    string | null
  >(null)

  const [creatingItemForBlockId, setCreatingItemForBlockId] = useState<
    string | null
  >(null)

  const [editingBlockId, setEditingBlockId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const [editingItemId, setEditingItemId] = useState<string | null>(null)

const [itemForm, setItemForm] = useState({
  sets: '',
  reps: '',
  loadTarget: '',
  notes: '',
})

  async function loadData() {
    if (!weekId) {
      return
    }

    try {
      setIsLoading(true)

      const daysData = await getOrCreateWorkoutDays(weekId)
      const blocksData = await getWorkoutBlocksByWeek(weekId)

      const itemsData = await getWorkoutItemsByBlocks(
        blocksData.map((block) => block.id),
      )

      setDays(daysData)
      setBlocks(blocksData)
      setItems(itemsData)
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

  async function handleSaveBlockTitle(blockId: string) {
    const title = editingTitle.trim()

    if (!title) {
      alert('Digite um nome para o bloco.')
      return
    }

    try {
      await updateWorkoutBlockTitle(blockId, title)

      setEditingBlockId(null)
      setEditingTitle('')

      await loadData()
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Erro ao atualizar o bloco.')
      }
    }
  }

  function handleCancelEditing() {
    setEditingBlockId(null)
    setEditingTitle('')
  }

  async function handleCreateExercise(blockId: string) {
    const exerciseName = window.prompt('Nome do exercício')

    if (!exerciseName?.trim()) {
      return
    }

    try {
      setCreatingItemForBlockId(blockId)

      const blockItems = items.filter(
        (item) => item.workout_block_id === blockId,
      )

      await createWorkoutItem(
        blockId,
        exerciseName.trim(),
        blockItems.length + 1,
      )

      await loadData()
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Erro ao criar exercício.')
      }
    } finally {
      setCreatingItemForBlockId(null)
    }
  }
  function handleStartEditingItem(item: WorkoutItem) {
    setEditingItemId(item.id)
  
    setItemForm({
      sets: item.sets ?? '',
      reps: item.reps ?? '',
      loadTarget: item.load_target ?? '',
      notes: item.notes ?? '',
    })
  }
  
  function handleCancelEditingItem() {
    setEditingItemId(null)
  
    setItemForm({
      sets: '',
      reps: '',
      loadTarget: '',
      notes: '',
    })
  }
  
  async function handleSaveWorkoutItem(itemId: string) {
    try {
      await updateWorkoutItem(itemId, itemForm)
  
      handleCancelEditingItem()
  
      await loadData()
    } catch (error) {
      console.error(error)
  
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Erro ao atualizar exercício.')
      }
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
            Monte os blocos e exercícios de cada dia.
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
                        {dayBlocks.map((block) => {
                          const blockItems = items.filter(
                            (item) =>
                              item.workout_block_id === block.id,
                          )

                          const isCreatingItem =
                            creatingItemForBlockId === block.id

                          return (
                            <div
                              key={block.id}
                              className="rounded-2xl border border-[#262626] bg-[#0B0B0B] p-4"
                            >
                              {editingBlockId === block.id ? (
                                <div className="flex flex-col gap-3">
                                  <input
                                    value={editingTitle}
                                    onChange={(event) =>
                                      setEditingTitle(event.target.value)
                                    }
                                    onKeyDown={(event) => {
                                      if (event.key === 'Enter') {
                                        void handleSaveBlockTitle(block.id)
                                      }

                                      if (event.key === 'Escape') {
                                        handleCancelEditing()
                                      }
                                    }}
                                    className="rounded-xl border border-[#262626] bg-[#171717] px-3 py-2 text-white outline-none focus:border-[#E5092F]"
                                    autoFocus
                                  />

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        void handleSaveBlockTitle(block.id)
                                      }
                                      className="rounded-lg bg-[#E5092F] px-3 py-2 text-sm font-semibold"
                                    >
                                      Salvar
                                    </button>

                                    <button
                                      type="button"
                                      onClick={handleCancelEditing}
                                      className="rounded-lg border border-[#262626] px-3 py-2 text-sm"
                                    >
                                      Cancelar
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingBlockId(block.id)
                                      setEditingTitle(block.title)
                                    }}
                                    className="text-left font-semibold text-[#E5092F] hover:underline"
                                  >
                                    {block.title}
                                  </button>

                                  <p className="mt-1 text-sm text-[#B3B3B3]">
                                    Bloco #{block.order_index}
                                  </p>
                                </div>
                              )}

                              <div className="mt-4 flex flex-col gap-3">
                              {blockItems.map((item) => (
  <div
    key={item.id}
    className="rounded-xl border border-[#262626] bg-[#171717] p-4"
  >
    {editingItemId === item.id ? (
      <div className="flex flex-col gap-4">
        <div>
          <p className="font-semibold text-white">
            {item.exercises.name}
          </p>

          <p className="mt-1 text-xs text-[#B3B3B3]">
            Exercício #{item.order_index}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm text-[#B3B3B3]">
            Séries
            <input
              value={itemForm.sets}
              onChange={(event) =>
                setItemForm((current) => ({
                  ...current,
                  sets: event.target.value,
                }))
              }
              placeholder="Ex.: 5"
              className="rounded-xl border border-[#262626] bg-[#0B0B0B] px-3 py-2 text-white outline-none focus:border-[#E5092F]"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-[#B3B3B3]">
            Repetições
            <input
              value={itemForm.reps}
              onChange={(event) =>
                setItemForm((current) => ({
                  ...current,
                  reps: event.target.value,
                }))
              }
              placeholder="Ex.: 3"
              className="rounded-xl border border-[#262626] bg-[#0B0B0B] px-3 py-2 text-white outline-none focus:border-[#E5092F]"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-[#B3B3B3]">
            Carga alvo
            <input
              value={itemForm.loadTarget}
              onChange={(event) =>
                setItemForm((current) => ({
                  ...current,
                  loadTarget: event.target.value,
                }))
              }
              placeholder="Ex.: 75% ou 80 kg"
              className="rounded-xl border border-[#262626] bg-[#0B0B0B] px-3 py-2 text-white outline-none focus:border-[#E5092F]"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2 text-sm text-[#B3B3B3]">
          Observações
          <textarea
            value={itemForm.notes}
            onChange={(event) =>
              setItemForm((current) => ({
                ...current,
                notes: event.target.value,
              }))
            }
            placeholder="Ex.: manter a barra próxima ao corpo"
            rows={3}
            className="resize-none rounded-xl border border-[#262626] bg-[#0B0B0B] px-3 py-2 text-white outline-none focus:border-[#E5092F]"
          />
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void handleSaveWorkoutItem(item.id)}
            className="rounded-lg bg-[#E5092F] px-4 py-2 text-sm font-semibold"
          >
            Salvar exercício
          </button>

          <button
            type="button"
            onClick={handleCancelEditingItem}
            className="rounded-lg border border-[#262626] px-4 py-2 text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    ) : (
      <button
        type="button"
        onClick={() => handleStartEditingItem(item)}
        className="w-full text-left"
      >
        <p className="font-semibold text-white">
          {item.exercises.name}
        </p>

        <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#B3B3B3]">
          <span>{item.sets || '—'} séries</span>
          <span>•</span>
          <span>{item.reps || '—'} repetições</span>
          <span>•</span>
          <span>{item.load_target || 'Carga não definida'}</span>
        </div>

        {item.notes && (
          <p className="mt-2 text-sm text-[#B3B3B3]">
            {item.notes}
          </p>
        )}

        <p className="mt-3 text-xs text-[#E5092F]">
          Clique para editar
        </p>
      </button>
    )}
  </div>
))}

                                <button
                                  type="button"
                                  onClick={() =>
                                    void handleCreateExercise(block.id)
                                  }
                                  disabled={isCreatingItem}
                                  className="rounded-xl border border-dashed border-[#404040] px-4 py-3 text-sm font-semibold text-[#B3B3B3] transition hover:border-[#E5092F] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {isCreatingItem
                                    ? 'Adicionando...'
                                    : '+ Exercício'}
                                </button>
                              </div>
                            </div>
                          )
                        })}
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