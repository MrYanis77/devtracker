"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

export interface User {
  username: string;
  password?: string;
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
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  repos: Repo[];
  favorites: number[];
  loading: boolean;
  error: string | null;
  filter: string;
  setFilter: (filter: string) => void;
  toggleFavorite: (id: number) => void;
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt'>) => void;
  updateNote: (id: string, noteData: Partial<Omit<Note, 'id' | 'createdAt'>>) => void;
  deleteNote: (id: string) => void;
  lang: 'fr' | 'en';
  setLang: (l: 'fr' | 'en') => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // --- ÉTATS ---
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const savedUser = localStorage.getItem("app_user");
    const savedNotes = localStorage.getItem("app_notes");
    const savedFavs = localStorage.getItem("app_favorites");
    const savedLang = localStorage.getItem("app_lang") as 'fr' | 'en';

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("app_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("app_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("app_lang", lang);
  }, [lang]);

  const login = (username: string, password: string): boolean => {
    const accountKey = `user_account_${username}`;
    const storedAccountRaw = localStorage.getItem(accountKey);
    
    if (storedAccountRaw) {
      const storedAccount = JSON.parse(storedAccountRaw);
      if (storedAccount.password !== password) return false;
    } else {
      localStorage.setItem(accountKey, JSON.stringify({ username, password }));
    }

    const sessionUser = { username };
    setUser(sessionUser);
    localStorage.setItem("app_user", JSON.stringify(sessionUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("app_user");
  };

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = `stars:>10000${filter ? `+language:${filter}` : ''}`;
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&per_page=20`
      );
      if (!response.ok) throw new Error("Erreur lors de la récupération des dépôts");
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

  const addNote = (noteData: { title: string; content: string; tag: string }) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, noteData: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...noteData } : n)));
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const resetApp = () => {
  try {
    setNotes([]);
    setFavorites([]);
    setFilter(""); 
    localStorage.removeItem("app_notes");
    localStorage.removeItem("app_favorites");
    
    console.log("App reset successful");
  } catch (e) {
    console.error("Failed to reset app:", e);
  }
};

  return (
    <AppContext.Provider value={{ 
      user, login, logout,
      repos, favorites, loading, error, filter, setFilter, toggleFavorite,
      notes, addNote, updateNote, deleteNote,
      lang, setLang, resetApp
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