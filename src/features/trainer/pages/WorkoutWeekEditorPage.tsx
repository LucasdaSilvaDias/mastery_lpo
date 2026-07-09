import { Link, useParams } from 'react-router-dom'

import { Card } from '../../../shared/components/Card'

const weekDays = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
]

export function WorkoutWeekEditorPage() {
  const { weekId } = useParams()

  return (
    <main className="min-h-screen bg-[#0B0B0B] px-6 py-8 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header>
          <Link to="/trainer" className="text-sm text-[#B3B3B3] hover:text-white">
            ← Voltar para o painel
          </Link>

          <h1 className="mt-4 text-3xl font-bold">
            Editor da <span className="text-[#E5092F]">Semana</span>
          </h1>

          <p className="mt-2 text-sm text-[#B3B3B3]">
            Semana ID: {weekId}
          </p>
        </header>

        <div className="grid gap-4">
          {weekDays.map((day) => (
            <Card key={day}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{day}</h2>
                  <p className="mt-1 text-sm text-[#B3B3B3]">
                    Nenhum bloco criado.
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-[#262626] px-4 py-2 text-sm font-semibold transition hover:bg-[#262626]"
                >
                  + Bloco
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}