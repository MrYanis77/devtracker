import NotesClient from "@/components/NotesClient";

export default function NotesPage() {
  return (
    <main className="p-8 max-w-5xl mx-auto min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Mes Notes</h1>
        <p className="text-default-500 text-lg">
          Organisez vos idées, snippets de code et rappels importants.
        </p>
      </header>

      {/* Le composant Client gère l'état et l'affichage des notes */}
      <NotesClient />
    </main>
  );
}