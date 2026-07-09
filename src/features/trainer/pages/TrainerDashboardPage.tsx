import { Plus } from 'lucide-react'

import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'

export function TrainerDashboardPage() {
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

            <Button type="button">
              <span className="flex items-center justify-center gap-2">
                <Plus size={18} />
                Nova Semana
              </span>
            </Button>
          </div>
        </Card>

        <Card>
          <p className="text-center text-[#B3B3B3]">
            Nenhuma semana criada ainda.
          </p>
        </Card>
      </div>
    </main>
  )
}