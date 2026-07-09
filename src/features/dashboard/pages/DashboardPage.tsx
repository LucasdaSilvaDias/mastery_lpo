import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { logout } from '../../auth/services/authService'
import {
  getCurrentProfile,
  type Profile,
} from '../../../services/profileService'

export function DashboardPage() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      const data = await getCurrentProfile()
      setProfile(data)
      setIsLoading(false)
    }

    loadProfile()
  }, [])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] text-white">
        Carregando perfil...
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-6 text-white">
      <Card>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-[#B3B3B3]">Bem-vindo de volta</p>

            <h1 className="mt-2 text-3xl font-bold">
              Olá, {profile?.full_name || 'atleta'} 👋
            </h1>
          </div>

          <div className="rounded-2xl border border-[#262626] bg-[#0B0B0B] p-4">
            <p className="text-sm text-[#B3B3B3]">Plano</p>
            <p className="mt-1 font-semibold uppercase text-[#E5092F]">
              {profile?.plan}
            </p>
          </div>

          <div className="rounded-2xl border border-[#262626] bg-[#0B0B0B] p-4">
            <p className="text-sm text-[#B3B3B3]">Perfil</p>
            <p className="mt-1 font-semibold uppercase">
              {profile?.role}
            </p>
          </div>

          <Button type="button" variant="secondary" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </Card>
    </main>
  )
}