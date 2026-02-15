'use client';

import { useRouter } from 'next/navigation';
import AdminCard from '@/components/admin/AdminCard';

export default function AdminSupportOverview() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Support Overview</h1>
      
      <div className="flex flex-col gap-4">
        <AdminCard 
          title="Bug Reports"
          description="View and manage reported bugs. Track status, severity, and assign fixes."
          onClick={() => router.push('/admin/support/bugs')}
        />

        <AdminCard 
          title="Support Tickets"
          description="Direct messages from users. Mark as read and respond to user inquiries."
          onClick={() => router.push('/admin/support/contact')}
        />

        <AdminCard 
          title="User Feedback"
          description="View suggestions, praise, complaints, and bug reports from users with ratings."
          onClick={() => router.push('/admin/support/feedback')}
        />

        <AdminCard 
          title="FAQ"
          description="Manage frequently asked questions organized by category."
          onClick={() => router.push('/admin/support/faq')}
        />
      </div>
    </div>
  );
}
