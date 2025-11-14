// src/pages/Login.jsx - Página completa de Login + Registro
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


export default function Login() {
  const [activeTab, setActiveTab] = useState('login')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const { login, registrar, usuario } = useAuth()
  const navigate = useNavigate()

  // Redireciona se já logado
  useEffect(() => {
    if (usuario) {
      navigate('/')
    }
  }, [usuario, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    const formData = new FormData(e.target)
    const nome = formData.get('nome')
    const email = formData.get('email')
    const senha = formData.get('senha')

    let result
    if (activeTab === 'login') {
      result = await login(email, senha)
    } else {
      result = await registrar(nome, email, senha)
    }

    setIsLoading(false)

    if (result.success) {
      if (activeTab === 'login') {
        setMessage({ type: 'success', text: 'Login realizado com sucesso! Redirecionando...' })
        setTimeout(() => navigate('/'), 1500)
      } else {
        setMessage({ type: 'success', text: 'Conta criada! Faça login agora.' })
        setActiveTab('login')
      }
    } else {
      setMessage({ type: 'error', text: result.error })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-green-700 to-emerald-900 flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-secondary mb-4 bg-gradient-to-r from-secondary to-yellow-400 bg-clip-text text-transparent">
            Checkpoint
          </h1>
          <p className="text-secondary/80 text-lg">Entre na sua jornada de jogos</p>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-1 mb-8 border border-white/20">
          <div className="flex bg-transparent rounded-xl overflow-hidden">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 px-6 font-semibold text-sm transition-all duration-300 ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-secondary to-yellow-300 text-primary shadow-lg shadow-yellow-500/25 scale-105'
                  : 'text-secondary/70 hover:text-secondary'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 px-6 font-semibold text-sm transition-all duration-300 ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-secondary to-yellow-300 text-primary shadow-lg shadow-yellow-500/25 scale-105'
                  : 'text-secondary/70 hover:text-secondary'
              }`}
            >
              Registrar
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {activeTab === 'register' && (
            <div className="mb-6">
              <label className="block text-secondary/90 font-semibold mb-3 text-sm uppercase tracking-wide">Nome Completo</label>
              <input
                type="text"
                name="nome"
                required
                className="input-field w-full bg-white/20 border-secondary/50 text-secondary placeholder-secondary/50 focus:border-yellow-400 focus:ring-yellow-400/30"
                placeholder="Seu nome aqui"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-secondary/90 font-semibold mb-3 text-sm uppercase tracking-wide">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input-field w-full bg-white/20 border-secondary/50 text-secondary placeholder-secondary/50 focus:border-yellow-400 focus:ring-yellow-400/30"
              placeholder="seu@email.com"
            />
          </div>

          <div className="mb-8">
            <label className="block text-secondary/90 font-semibold mb-3 text-sm uppercase tracking-wide">Senha</label>
            <input
              type="password"
              name="senha"
              required
              minLength={6}
              className="input-field w-full bg-white/20 border-secondary/50 text-secondary placeholder-secondary/50 focus:border-yellow-400 focus:ring-yellow-400/30"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary text-lg font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processando...
              </>
            ) : activeTab === 'login' ? (
              'Entrar'
            ) : (
              'Criar Conta'
            )}
          </button>
        </form>

        {/* Message */}
        {message.text && (
          <div
            className={`mt-6 p-4 rounded-2xl text-center font-semibold transition-all duration-300 ${
              message.type === 'success'
                ? 'bg-green-500/20 border border-green-400/50 text-green-100'
                : 'bg-red-500/20 border border-red-400/50 text-red-100'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-secondary/70 text-sm">
          <p>
            Já tem conta?{' '}
            <button
              onClick={() => setActiveTab('login')}
              className={`font-semibold hover:text-secondary transition-colors ${
                activeTab === 'register' ? 'underline decoration-yellow-400' : ''
              }`}
            >
              Entrar
            </button>
          </p>
          {activeTab === 'login' && (
            <p className="mt-2">
              Nova por aqui?{' '}
              <button
                onClick={() => setActiveTab('register')}
                className="font-semibold hover:text-secondary underline decoration-yellow-400"
              >
                Crie sua conta
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}