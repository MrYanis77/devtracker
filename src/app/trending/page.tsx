//Composant client
import RepoList from "@/components/RepoList";

async function getInitialRepos() {
  // Le serveur cherche les données AVANT que la page n'arrive chez l'utilisateur
  const res = await fetch(
    "https://api.github.com/search/repositories?q=stars:>10000&sort=stars&per_page=12",
    { next: { revalidate: 3600 } } // Optionnel : met à jour les données toutes les heures
  );
  const data = await res.json();
  return data.items || [];
}

export default async function TrendingPage() {
  const initialRepos = await getInitialRepos();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* On passe les données au composant client */}
      <RepoList initialRepos={initialRepos} />
    </div>
  );
}