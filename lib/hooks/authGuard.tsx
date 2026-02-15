'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/authContext";

// hook to guard admin routes
export function useAdminGuard() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  React.useEffect(() => { 
    // console.log("isLoading:" "user:", user, "token:", !!token);

    if (isLoading) {
      return;
    }

    // User is not authenticated, redirect to login
    if (!user || !token) {
    // console.log("No user or token found");
      router.push("/");
      return;
    }

    // console.log("User found:", user.username, "Role:", user.role, "Type:", typeof user.role);

    // User is not admin, redirect to home
    if (user.role !== "Admin") {
      router.push("/");
      return;
    }

    // User is admin
    setIsAuthorized(true);
  }, [user, token, isLoading, router]);

  return { isAuthorized, user };
}


export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthorized } = useAdminGuard();

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
