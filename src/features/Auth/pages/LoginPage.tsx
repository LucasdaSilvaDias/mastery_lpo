import { Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <main>
      <Dumbbell size={40} />

      <h1>Mastery LPO</h1>
      <p>Entre para acessar seus treinos.</p>

      <form>
        <label>
          E-mail
          <input type="email" placeholder="seu@email.com" />
        </label>

        <label>
          Senha
          <input type="password" placeholder="Sua senha" />
        </label>

        <button type="button">Entrar</button>
      </form>

      <p>
        Não tem conta? <Link to="/register">Criar conta</Link>
      </p>
    </main>
  )
}