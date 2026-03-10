//Composant serveur
"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Select, SelectItem, Skeleton, Chip, Link } from "@heroui/react";
import { useAppContext } from "@/context/AppContext";

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Rust", "Go"];

export default function RepoList({ initialRepos }: { initialRepos: any[] }) {
  const [repos, setRepos] = useState(initialRepos);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("");
  const { favorites, toggleFavorite } = useAppContext();

  useEffect(() => {
    if (!lang) return; // Évite un double appel au premier chargement
    const fetchData = async () => {
      setLoading(true);
      const query = `+language:${lang}`;
      const response = await fetch(`https://api.github.com/search/repositories?q=stars:>10000${query}&sort=stars&per_page=12`);
      const data = await response.json();
      setRepos(data.items || []);
      setLoading(false);
    };
    fetchData();
  }, [lang]);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold">Tendances GitHub</h1>
        <Select 
          label="Langage" 
          className="max-w-xs" 
          onSelectionChange={(keys) => setLang(Array.from(keys)[0] as string)}
        >
          {LANGUAGES.map((l) => (
            <SelectItem key={l.toLowerCase()} value={l.toLowerCase()}>{l}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? <p>Chargement...</p> : repos.map((repo) => (
          <Card key={repo.id}>
            <CardHeader className="flex justify-between">
              <Link href={repo.html_url} isExternal>{repo.name}</Link>
              <Button isIconOnly onPress={() => toggleFavorite(repo)}>
                {favorites.some((f: any) => f.id === repo.id) ? "❤️" : "🤍"}
              </Button>
            </CardHeader>
            <CardBody><p className="line-clamp-2">{repo.description}</p></CardBody>
          </Card>
        ))}
      </div>
    </>
  );
}