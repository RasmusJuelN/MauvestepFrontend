'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/hooks/authContext'
import { useRouter } from 'next/navigation'
import { getErrorMessage } from '@/lib/utilities/errorhandling/errorHandler';import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'

export default function Login() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const loggedInUser = await login(username, password, rememberMe)
      
      // Redirect based on user role
      if (loggedInUser?.role === "Admin") {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (err) {
      setError(getErrorMessage(err, 'Login failed. Please try again.'));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mt-3">
      {error && (
        <div className="p-2 mt-2 bg-red-900/50 border border-red-700/50 text-red-200 text-xs rounded">
          {error}
        </div>
      )}
      
      <Input
        name="username"
        type="text"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        disabled={isLoading}
        required
      />

      <Input
        name="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        disabled={isLoading}
        required
      />

      <label className="flex items-center gap-2 text-sm text-indigo-300">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          disabled={isLoading}
          className="w-4 h-4 bg-indigo-950/50 border-indigo-700/50 rounded accent-indigo-800"
        />
        Remember Me
      </label>

      <Button
        type="submit"
        variant="submit"
        fullWidth
        loading={isLoading}
      >
        Log in
      </Button>

      <a href="/register" className="hidden lg-custom:block text-center text-sm text-indigo-400 hover:underline">
        No account? Register here
      </a>
    </form>
  )
}
