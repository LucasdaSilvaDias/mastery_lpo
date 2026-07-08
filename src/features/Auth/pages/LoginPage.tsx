import { useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { Input } from '../../../shared/components/Input'
import { login } from '../services/authService'

export function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsLoading(true)
      setErrorMessage('')

      await login({
        email,
        password,
      })

      navigate('/dashboard')
    } catch {
      setErrorMessage('E-mail ou senha inválidos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0B0B] px-6">
      <Card>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="rounded-full border border-[#262626] bg-[#171717] p-4">
            <Dumbbell size={42} className="text-[#E5092F]" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Mastery <span className="text-[#E5092F]">LPO</span>
          </h1>

          <p className="text-[#B3B3B3]">Treine. Evolua. Supere.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <Input
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {errorMessage && (
            <p className="text-sm text-[#EF4444]">{errorMessage}</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Link to="/register" className="text-[#E5092F] hover:underline">
            Criar conta
          </Link>

          <button
            type="button"
            className="text-[#B3B3B3] transition hover:text-white"
          >
            Esqueci minha senha
          </button>
        </div>
      </Card>
    </main>
  )
}