'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/authService';
import { LayoutList, BarChart2, LogOut } from 'lucide-react';

export default function AuthHeader() {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    getCurrentUser(token)
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  if (!user) return null; 

  return (
    <header className="w-full px-6 py-4 bg-gray-950 text-white flex justify-between items-center border-b border-white/10">
      <h1
        className="text-lg font-semibold cursor-pointer"
        onClick={() => router.push('/')}
      >
        Portfolio ESGI
      </h1>

      <div className="flex items-center gap-6">
        <button onClick={() => router.push('/projects')} title="Projets">
          <LayoutList className="w-5 h-5 hover:text-accent hover:text-yellow-500  transition" />
        </button>

        {user.role === 'admin' && (
          <button onClick={() => router.push('/admin/likes')} title="Stats de likes">
            <BarChart2 className="w-5 h-5 hover:text-accent hover:text-yellow-500  transition" />
          </button>
        )}

        <button onClick={handleLogout} title="Déconnexion">
          <LogOut className="w-5 h-5 hover:text-red-500 transition" />
        </button>
      </div>
    </header>
  );
}
