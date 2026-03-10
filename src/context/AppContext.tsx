"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// --- Interfaces ---

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export interface User {
  id: number;
  username: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  date: string;
  userId: number; // Lie la note à l'utilisateur spécifique
}

interface ContextType {
  // Auth
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  
  // GitHub Repos
  repos: Repo[];
  favorites: Repo[];
  filter: string;
  setFilter: (l: string) => void;
  toggleFavorite: (r: Repo) => void;
  
  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, "userId">) => void;
  deleteNote: (id: string) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

// --- Provider ---

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [favorites, setFavorites] = useState<Repo[]>([]);
  const [allNotes, setAllNotes] = useState<Note[]>([]); // Toutes les notes stockées
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // 1. Initialisation (LocalStorage)
  useEffect(() => {
    const savedFavs = localStorage.getItem('favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));

    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedNotes = localStorage.getItem('user_notes');
    if (savedNotes) setAllNotes(JSON.parse(savedNotes));

    // Charger GitHub
    axios.get('https://api.github.com/search/repositories?q=stars:>10000&sort=stars&per_page=20')
      .then(res => setRepos(res.data.items))
      .catch(() => console.error("Erreur API GitHub"))
      .finally(() => setLoading(false));
  }, []);

  // --- Fonctions d'Authentification ---

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800)); // Simulation

      if (username.trim().length > 0 && password.trim().length > 0) {
        const userData = { 
          id: Math.floor(Math.random() * 1000), 
          username: username 
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error("Veuillez remplir tous les champs");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // --- Fonctions Favoris & GitHub ---

  const toggleFavorite = (repo: Repo) => {
    const isFav = favorites.find(f => f.id === repo.id);
    const updated = isFav 
      ? favorites.filter(f => f.id !== repo.id) 
      : [...favorites, repo];
    
    setFavorites(updated);
    localStorage.setItem('favs', JSON.stringify(updated));
  };

  const filteredRepos = filter === 'All' 
    ? repos 
    : repos.filter(r => r.language === filter);

  // --- Fonctions Notes ---

  const addNote = (noteData: Omit<Note, "userId">) => {
    if (!user) return;

    const newNote: Note = {
      ...noteData,
      userId: user.id // On attache l'ID de l'utilisateur connecté
    };

    const updatedNotes = [...allNotes, newNote];
    setAllNotes(updatedNotes);
    localStorage.setItem('user_notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (id: string) => {
    const updatedNotes = allNotes.filter(n => n.id !== id);
    setAllNotes(updatedNotes);
    localStorage.setItem('user_notes', JSON.stringify(updatedNotes));
  };

  // IMPORTANT : On ne filtre les notes à afficher que pour l'utilisateur actuel
  const userNotes = allNotes.filter(n => n.userId === user?.id);

  // --- Rendu du Provider ---

  return (
    <AppContext.Provider value={{ 
      user,
      loading,
      login,
      logout,
      repos: filteredRepos, 
      favorites, 
      filter, 
      setFilter, 
      toggleFavorite,
      notes: userNotes, // On expose les notes filtrées
      addNote,
      deleteNote
    }}>
      {children}
    </AppContext.Provider>
  );
};

// --- Hook Personnalisé ---

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Missing AppProvider");
  return context;
};