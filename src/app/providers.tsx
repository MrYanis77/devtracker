"use client"

import {HeroUIProvider} from '@heroui/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProvider } from "../context/AppContext";

export function Providers({children}: { children: React.ReactNode }) {
  return (
     <NextThemesProvider attribute="class" defaultTheme="white">
      <HeroUIProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  )
}