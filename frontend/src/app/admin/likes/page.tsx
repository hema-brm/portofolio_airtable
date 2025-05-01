'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAllProjects } from '@/services/projectsService';
import { getCurrentUser } from '@/services/authService';
import LikesChart from '@/components/LikesChart';
import Loader from '@/components/Loader';
import AuthHeader from '@/components/Header';

export default function AdminLikesPage() {
  const [likesData, setLikesData] = useState<{ name: string; likes: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    (async () => {
      try {
        const user = await getCurrentUser(token);
        if (user.role !== 'admin') {
          router.push('/');
          return;
        }

        const projects = await fetchAllProjects(token);
        const data = projects.map((project) => ({
          name: project.name,
          likes: project.likesTotal || 0,
        }));
        setLikesData(data);
      } catch (err) {
        router.push('admin/login');
        console.log('err', err);
        
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  return (
    <>
    <AuthHeader />
    <main className="min-h-screen bg-black text-white px-8 pt-0">
        <div className="p-8">
        {loading ? <Loader size={30} /> : <LikesChart data={likesData} />}
        </div>
    </main>
    </>
  );
}
