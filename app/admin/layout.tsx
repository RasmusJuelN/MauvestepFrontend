'use client';
import { useAdminGuard } from '@/lib/hooks/authGuard';
import PageContainer from '@/components/layout/PageContainer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthorized } = useAdminGuard(); // requires admin role for all /admin routes

  // Show loading state while checking authorization
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  // If authorized, render page content within container
  return (
    <PageContainer>
      {children}
    </PageContainer>
  );
}
