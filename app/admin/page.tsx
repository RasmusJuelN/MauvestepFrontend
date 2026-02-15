'use client';
import { useRouter } from 'next/navigation';
import AdminCard from '@/components/admin/AdminCard';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="flex flex-col space-y-4">
        <AdminCard 
          title="News"
          description="Manage news articles"
          onClick={() => router.push('/admin/news')}
        />

        <AdminCard 
          title="Game Mechanics"
          description="Manage game mechanics & abilities"
          onClick={() => router.push('/admin/game-mechanics')}
        />

        <AdminCard 
          title="Support"
          description="View user reports and messages"
          onClick={() => router.push('/admin/support')}
        />
      </div>
    </div>
  );
}
