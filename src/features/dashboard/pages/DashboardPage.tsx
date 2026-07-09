import { useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/components/Button'
import { logout } from '../../auth/services/authService'

export function DashboardPage() {
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-6 text-white">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-3xl border border-[#262626] bg-[#171717] p-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-[#B3B3B3]">
            Bem-vindo ao Mastery LPO.
          </p>
        </div>

        <Button type="button" variant="secondary" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </main>
  )
}