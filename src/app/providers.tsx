"use client"
import {HeroUIProvider} from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProvider } from "../Context/AppContext";

export function Providers({children}: { children: React.ReactNode }) {
  return (
     <NextThemesProvider attribute="class" defaultTheme="dark">
      <HeroUIProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  )
}