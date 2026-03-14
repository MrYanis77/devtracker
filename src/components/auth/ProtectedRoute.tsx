"use client";
import { useApp } from "@/Context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); 
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="h-screen w-full bg-white" />; 

  return <>{children}</>;
}