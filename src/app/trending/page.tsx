"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Select, SelectItem, Skeleton, Chip, Link } from "@heroui/react";
import { useAppContext } from "@/context/AppContext";

const LANGUAGES = ["JavaScript", "TypeScript", "Python", "Rust", "Go"];

export default function TrendingPage() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("");
  const { favorites, toggleFavorite } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = lang ? `+language:${lang}` : "";
        const response = await fetch(
          `https://api.github.com/search/repositories?q=stars:>10000${query}&sort=stars&per_page=20`
        );
        const data = await response.json();
        setRepos(data.items || []);
      } catch (error) {
        console.error("Erreur API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lang]); // Re-charge quand le langage change

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trending Repos</h1>
        
        <Select 
          label="Langage" 
          placeholder="Tous" 
          className="max-w-xs"
          onChange={(e) => setLang(e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <SelectItem key={l.toLowerCase()} value={l.toLowerCase()}>{l}</SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Squelettes de chargement
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="w-full h-[200px] p-4">
              <Skeleton className="rounded-lg h-12 w-3/4 mb-4" />
              <Skeleton className="rounded-lg h-4 w-full mb-2" />
              <Skeleton className="rounded-lg h-4 w-2/3" />
            </Card>
          ))
        ) : (
          repos.map((repo: any) => (
            <Card key={repo.id} isHoverable className="p-2">
              <CardHeader className="flex justify-between items-start">
                <div className="flex flex-col">
                  <Link href={repo.html_url} isExternal className="font-bold text-primary">
                    {repo.name}
                  </Link>
                  <p className="text-tiny uppercase font-bold text-default-400">{repo.language}</p>
                </div>
                <Button 
                  isIconOnly 
                  variant="light" 
                  onPress={() => toggleFavorite(repo)}
                >
                  {favorites.find((f: any) => f.id === repo.id) ? "❤️" : "🤍"}
                </Button>
              </CardHeader>
              <CardBody className="py-2">
                <p className="text-sm text-default-600 line-clamp-2">{repo.description}</p>
              </CardBody>
              <CardFooter className="flex gap-3">
                <Chip size="sm" variant="flat" color="warning">⭐ {repo.stargazers_count.toLocaleString()}</Chip>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}