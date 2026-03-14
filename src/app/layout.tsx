"use client";

import { Providers } from "./providers";
import Navigation from "@/Components/Navigation";
import { useApp } from "@/Context/AppContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import "./global.css";

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useApp(); 
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/connexion", "/inscription"];

  useEffect(() => {
    if (!loading && !user && !publicRoutes.includes(pathname)) {
      router.push("/");
    }
  }, [user, loading, pathname, router]);

  if (loading && !publicRoutes.includes(pathname)) {
    return <div className="h-screen bg-white" />; 
  }

  return <>{children}</>;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased font-sans">
        <Providers>
          <AuthWrapper>
            <div className="relative flex flex-col h-screen">
              <Navigation />
              <main className="container mx-auto max-w-7xl px-6 flex-grow pt-8">
                {children}
              </main>
            </div>
          </AuthWrapper>
        </Providers>
      </body>
    </html>
  );
}