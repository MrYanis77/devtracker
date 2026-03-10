"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// 1. On définit l'interface (Optionnel mais recommandé avec TS)
interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

interface AppContextType {
  favorites: Repo[];
  toggleFavorite: (repo: Repo) => void;
  isFavorite: (id: number) => boolean;
}

// 2. Création du contexte
const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. EXPORT de l'AppProvider (C'est ce qui manquait peut-être)
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("github-favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("github-favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (repo: Repo) => {
    setFavorites((prev) =>
      prev.find((r) => r.id === repo.id)
        ? prev.filter((r) => r.id !== repo.id)
        : [...prev, repo]
    );
  };

  const isFavorite = (id: number) => favorites.some((r) => r.id === id);

  return (
    <AppContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

// 4. EXPORT du Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};