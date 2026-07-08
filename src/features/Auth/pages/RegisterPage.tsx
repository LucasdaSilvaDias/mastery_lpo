import { useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { Input } from '../../../shared/components/Input'
import { register } from '../services/authService'

export function RegisterPage() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não conferem.')
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage('')
    
      await register({
        fullName,
        email,
        password,
      })
    
      navigate('/dashboard')
    
    } catch (error: unknown) {
      console.error(error)
    
      if (error instanceof Error) {
        alert(error.message)
        setErrorMessage(error.message)
      } else {
        alert('Erro desconhecido')
        setErrorMessage('Erro desconhecido')
      }
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
            Criar <span className="text-[#E5092F]">conta</span>
          </h1>

          <p className="text-[#B3B3B3]">Comece seus treinos no Mastery LPO.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <Input
            label="Nome completo"
            placeholder="Digite seu nome"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />

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
            placeholder="Crie uma senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <Input
            label="Confirmar senha"
            type="password"
            placeholder="Repita sua senha"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />

          {errorMessage && (
            <p className="text-sm text-[#EF4444]">{errorMessage}</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <div className="mt-8 flex justify-center">
          <Link to="/login" className="text-[#E5092F] hover:underline">
            Já tenho conta
          </Link>
        </div>
      </Card>
    </main>
  )
}