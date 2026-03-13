"use client";

import React from "react";
import { Select, SelectItem, Divider, Skeleton, Card } from "@heroui/react";
import { useApp } from "@/Context/AppContext";
import { RepoCard } from "@/Components/pages/RepoCard";

const LANGUAGES = [
  { label: "Tous les langages", value: "all" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
];

export default function TrendingPage() {
  const { repos, loading, error, favorites, setFilter } = useApp();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-danger">
        <p className="font-bold">Erreur : {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* HEADER & FILTRE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">Trending</h1>
          <p className="text-default-500 text-sm">Les dépôts GitHub les plus populaires.</p>
        </div>

        <Select 
          label="Langage" 
          placeholder="Choisir un langage"
          className="max-w-xs"
          variant="bordered"
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string;
            setFilter(val === "all" ? "" : val);
          }}
        >
          {LANGUAGES.map((lang) => (
            <SelectItem key={lang.value} textValue={lang.label}>
              {lang.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Divider />

      {/* GRILLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeletons pendant le chargement
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="w-full h-[220px] p-4" radius="lg">
              <Skeleton className="rounded-lg h-full w-full" />
            </Card>
          ))
        ) : (
          // Affichage des cartes via le composant RepoCard
          repos.map((repo) => (
            <RepoCard 
              key={repo.id} 
              repo={repo} 
              isFav={favorites.includes(repo.id)} 
            />
          ))
        )}
      </div>

      {/* État vide */}
      {!loading && repos.length === 0 && (
        <div className="text-center py-20 text-default-400 italic">
          Aucun dépôt trouvé.
        </div>
      )}
    </div>
  );
}