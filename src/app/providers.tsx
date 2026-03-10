"use client"; 
import { HeroUIProvider } from '@heroui/react'
import Navigation from '@/components/Navigation';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
        <Navigation/>
      {children}
    </HeroUIProvider>
  )
}