import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Chip, Link } from "@heroui/react";
import { useApp, Repo } from "@/Context/AppContext";

// On utilise directement Repo dans les arguments de la fonction
export const RepoCard = ({ repo, isFav }: { repo: Repo; isFav: boolean }) => {
  const { toggleFavorite } = useApp();

  return (
    <Card className="border-none shadow-sm hover:shadow-md transition-all h-full">
      <CardHeader className="flex justify-between items-start pb-2">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold truncate max-w-[180px]">{repo.name}</h3>
          <p className="text-xs text-default-400">@{repo.full_name.split('/')[0]}</p>
        </div>
        <Button
          isIconOnly
          variant="light"
          radius="full"
          onPress={() => toggleFavorite(repo.id)}
          className={isFav ? "text-danger" : "text-default-400"}
        >
          {isFav ? "❤️" : "🤍"}
        </Button>
      </CardHeader>

      <CardBody className="py-2">
        <p className="text-sm text-default-600 line-clamp-3">
          {repo.description || "Aucune description disponible."}
        </p>
      </CardBody>

      <CardFooter className="flex justify-between items-center pt-4">
        <div className="flex gap-2 items-center">
          {repo.language && (
            <Chip size="sm" variant="flat" color="primary">{repo.language}</Chip>
          )}
          <span className="text-xs font-bold text-default-500">
            ⭐ {repo.stargazers_count.toLocaleString()}
          </span>
        </div>
        <Link isExternal showAnchorIcon href={repo.html_url} size="sm" className="font-bold">
          GitHub
        </Link>
      </CardFooter>
    </Card>
  );
};