'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/services/authService';
import Loader from '@/components/Loader';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { token } = await login({ email, password });
      localStorage.setItem('token', token);
      router.push('/projects');
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-white text-center">Connexion Admin</h1>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm text-gray-400">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="email@esgi.fr"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-sm text-gray-400">Mot de passe</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="********"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-accent text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          {loading ? <Loader size={20} /> : 'Se connecter'}
        </button>
      </form>
    </main>
  );
}
