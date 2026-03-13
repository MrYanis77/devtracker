"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// --- INTERFACES ---

export interface User {
  username: string;
  password?: string; // Optionnel dans la session, obligatoire dans le stockage "compte"
}

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

interface AppContextType {
  // Auth
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  // GitHub
  repos: Repo[];
  favorites: number[];
  loading: boolean;
  error: string | null;
  filter: string;
  setFilter: (filter: string) => void;
  toggleFavorite: (id: number) => void;
  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  deleteNote: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // États Authentification
  const [user, setUser] = useState<User | null>(null);
  
  // États GitHub
  const [repos, setRepos] = useState<Repo[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');

  // États Notes
  const [notes, setNotes] = useState<Note[]>([]);

  // --- 1. PERSISTENCE (LocalStorage) ---

  useEffect(() => {
    // Charger la session utilisateur active
    const savedUser = localStorage.getItem("app_user");
    const savedNotes = localStorage.getItem("app_notes");
    const savedFavs = localStorage.getItem("app_favorites");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  // Sauvegarde auto des notes et favoris
  useEffect(() => {
    localStorage.setItem("app_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("app_favorites", JSON.stringify(favorites));
  }, [favorites]);


  // --- 2. LOGIQUE AUTHENTIFICATION ---

  const login = (username: string, password: string): boolean => {
    // On cherche si un compte existe déjà pour ce nom d'utilisateur
    const storedAccountRaw = localStorage.getItem(`user_account_${username}`);
    
    if (storedAccountRaw) {
      const storedAccount = JSON.parse(storedAccountRaw);
      // Vérification du mot de passe
      if (storedAccount.password !== password) {
        return false; 
      }
    } else {
      // Si le compte n'existe pas, on le crée (Inscription automatique)
      const newAccount = { username, password };
      localStorage.setItem(`user_account_${username}`, JSON.stringify(newAccount));
    }

    // Création de la session (on ne stocke pas le MDP dans le state pour plus de propreté)
    const sessionUser = { username };
    setUser(sessionUser);
    localStorage.setItem("app_user", JSON.stringify(sessionUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("app_user");
  };


  // --- 3. LOGIQUE GITHUB API ---

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = `stars:>10000${filter ? `+language:${filter}` : ''}`;
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=20`
      );
      if (!response.ok) throw new Error("Erreur de connexion à GitHub");
      const data = await response.json();
      setRepos(data.items || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [filter]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };


  // --- 4. LOGIQUE DES NOTES ---

  const addNote = (newNote: Omit<Note, 'id' | 'createdAt'>) => {
    const note: Note = {
      ...newNote,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [note, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };


  return (
    <AppContext.Provider value={{ 
      user, login, logout,
      repos, favorites, loading, error, filter, setFilter, toggleFavorite,
      notes, addNote, deleteNote 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp doit être utilisé dans un AppProvider");
  return context;
};