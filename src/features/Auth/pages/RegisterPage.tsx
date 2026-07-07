import { Link } from 'react-router-dom'

export function RegisterPage() {
  return (
    <main>
      <h1>Criar conta</h1>
      <p>Cadastro do atleta.</p>

      <Link to="/login">Voltar para login</Link>
    </main>
  )
}