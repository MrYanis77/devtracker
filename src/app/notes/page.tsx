"use client";

import React, { useState } from "react";
import { 
  Button, Input, Textarea, Select, SelectItem, Divider, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure 
} from "@heroui/react";
import { useApp } from "@/Context/AppContext";
import { NoteCard } from "@/Components/pages/NoteCard";

const TAGS = ["React", "CSS", "DevOps", "IA", "TypeScript"];

export default function NotesPage() {
  const { notes, addNote } = useApp();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [form, setForm] = useState({ title: "", content: "", tag: "React" });

  const handleSave = () => {
    if (!form.title || !form.content) return;
    addNote(form);
    setForm({ title: "", content: "", tag: "React" });
    onOpenChange();
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = filterTag === "all" || n.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">Mes Notes</h1>
        <Button color="primary" variant="shadow" onPress={onOpen} className="font-bold">
          + Nouvelle Note
        </Button>
      </div>

      {/* FILTRES */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input 
          placeholder="Rechercher une note..." 
          className="flex-1"
          value={search} 
          onValueChange={setSearch} 
          variant="bordered"
        />
        <Select 
          className="w-full md:w-48" 
          label="Tag" 
          onSelectionChange={(k) => setFilterTag(Array.from(k)[0] as string)}
        >
          <SelectItem key="all" textValue="Tous les tags">Tous les tags</SelectItem>
          {TAGS.map(t => <SelectItem key={t} textValue={t}>{t}</SelectItem>)}
        </Select>
      </div>

      <Divider />

      {/* LISTE DES NOTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* MODAL D'AJOUT */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="uppercase italic font-bold">Nouvelle Note</ModalHeader>
              <ModalBody className="gap-4">
                <Input 
                  label="Titre" 
                  placeholder="Le sujet de votre veille"
                  value={form.title} 
                  onValueChange={v => setForm({...form, title: v})} 
                />
                <Textarea 
                  label="Contenu" 
                  placeholder="Que voulez-vous retenir ?"
                  value={form.content} 
                  onValueChange={v => setForm({...form, content: v})} 
                />
                <Select 
                  label="Tag" 
                  selectedKeys={[form.tag]}
                  onSelectionChange={(k) => setForm({...form, tag: Array.from(k)[0] as string})}
                >
                  {TAGS.map(t => <SelectItem key={t} textValue={t}>{t}</SelectItem>)}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>Annuler</Button>
                <Button color="primary" className="font-bold" onPress={handleSave}>Enregistrer</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}