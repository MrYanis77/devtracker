"use client";

import { useState } from "react";
import { 
  Input, Textarea, Button, Select, SelectItem, 
  Card, CardHeader, CardBody, CardFooter, 
  Chip, Divider 
} from "@heroui/react";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";

const TAGS = ["React", "CSS", "DevOps", "IA", "Next.js"];

export default function NotesClient() {
  // 1. Récupération sécurisée du contexte
  const context = useAppContext();
  const params = useParams();
  
  // Sécurité si le contexte n'est pas encore chargé
  if (!context) return <p>Chargement du contexte...</p>;
  
  const { notes = [], addNote, deleteNote } = context;

  // États locaux
  const [newNote, setNewNote] = useState({ title: "", content: "", tag: "React" });
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");

  const handleAdd = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    
    addNote({ 
      ...newNote, 
      id: Date.now().toString(), // Utilise un string pour l'ID par convention
      date: new Date().toISOString(),
      userId: params.id // On lie la note à l'ID de l'URL
    });
    
    setNewNote({ title: "", content: "", tag: "React" });
  };

  // 2. Filtrage (ajout d'une sécurité sur notes.filter)
  const filteredNotes = (notes || [])
    .filter(n => (filterTag === "all" || n.tag === filterTag))
    .filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col gap-8">
      
      {/* 1. FORMULAIRE D'AJOUT */}
      <Card className="p-4 border-none bg-default-50 shadow-sm">
        <CardBody className="gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Input 
              label="Titre" 
              placeholder="Titre de la note"
              variant="bordered"
              value={newNote.title} 
              onValueChange={(v) => setNewNote({...newNote, title: v})} 
            />
            <Select 
              label="Tag" 
              className="max-w-full md:max-w-[150px]"
              variant="bordered"
              selectedKeys={[newNote.tag]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                if (selected) setNewNote({...newNote, tag: selected});
              }}
            >
              {TAGS.map(t => <SelectItem key={t} textValue={t}>{t}</SelectItem>)}
            </Select>
          </div>
          <Textarea 
            label="Contenu" 
            placeholder="Écrivez votre note ici..." 
            variant="bordered"
            value={newNote.content}
            onValueChange={(v) => setNewNote({...newNote, content: v})}
          />
          <Button 
            color="primary" 
            onPress={handleAdd} 
            className="font-bold self-end md:w-auto w-full"
          >
            Ajouter la note
          </Button>
        </CardBody>
      </Card>

      <Divider />

      {/* 2. BARRE DE RECHERCHE ET FILTRES */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input 
          placeholder="Rechercher une note..." 
          className="flex-1" 
          value={search} 
          onValueChange={setSearch} 
          isClearable
        />
        <Select 
          placeholder="Filtrer par tag" 
          className="max-w-full md:max-w-[200px]"
          onSelectionChange={(keys) => setFilterTag(Array.from(keys)[0] as string || "all")}
        >
          <SelectItem key="all" textValue="all">Tous les tags</SelectItem>
          {TAGS.map(t => <SelectItem key={t} textValue={t}>{t}</SelectItem>)}
        </Select>
      </div>

      {/* 3. LISTE DES NOTES */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} shadow="sm" className="hover:border-primary border-transparent border-2 transition-colors">
              <CardHeader className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg">{note.title}</h3>
                  <p className="text-tiny text-default-400">
                    {new Date(note.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <Chip size="sm" color="primary" variant="flat">{note.tag}</Chip>
              </CardHeader>
              <CardBody>
                <p className="text-default-600 text-sm whitespace-pre-wrap">{note.content}</p>
              </CardBody>
              <CardFooter className="justify-end gap-2">
                <Button size="sm" variant="light" isIconOnly>✏️</Button>
                <Button 
                  size="sm" 
                  variant="light" 
                  color="danger" 
                  isIconOnly 
                  onPress={() => confirm("Supprimer cette note ?") && deleteNote(note.id)}
                >
                  🗑️
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-default-400">
          Aucune note trouvée.
        </div>
      )}
    </div>
  );
}