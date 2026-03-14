"use client";

import React, { useState } from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { useApp } from "@/Context/AppContext";
import { NoteCard } from "../../Components/pages/NoteCard";

const TAGS = ["React", "CSS", "DevOps", "IA", "TypeScript"];

export default function NotesPage() {
  const { notes, lang } = useApp(); 
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");

  const t = {
    fr: {
      title: "Notes",
      subtitle: "Ajoutez et gérez vos notes en un clic.",
      search: "Rechercher...",
      filter: "Filtrer par Tag",
      allTags: "Tous les tags"
    },
    en: {
      title: "Notes",
      subtitle: "Add and manage your notes in one click.",
      search: "Search...",
      filter: "Filter by Tag",
      allTags: "All tags"
    }
  }[lang as "fr" | "en"] || { title: "Notes" };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                          n.content.toLowerCase().includes(search.toLowerCase());
    const matchesTag = filterTag === "all" || n.tag === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto p-6 pt-10 space-y-12">
        
        <div className="space-y-1">
          <h1 className="text-7xl font-[1000] italic uppercase tracking-tighter text-[#1e40af] leading-none">
            {t.title}
          </h1>
          <p className="text-slate-400 font-bold text-lg ml-1">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input 
            placeholder={t.search} 
            className="flex-1"
            value={search} 
            onValueChange={setSearch} 
            variant="flat"
            classNames={{ 
              inputWrapper: "bg-white h-16 px-6 shadow-sm border border-slate-100 rounded-full flex items-center",
              input: "text-lg font-medium bg-transparent h-full !p-0"
            }}
          />
          
          <Select 
            placeholder={t.filter}
            className="w-full md:w-64" 
            variant="flat"
            selectorIcon={<span />} 
            onSelectionChange={(k) => setFilterTag(Array.from(k)[0] as string)}
            classNames={{ 
                trigger: "bg-white h-16 px-6 shadow-sm border border-slate-100 rounded-full",
                value: "text-lg font-bold text-slate-600"
            }}
            popoverProps={{
                portalContainer: typeof document !== "undefined" ? document.body : undefined,
                className: "rounded-2xl shadow-2xl border border-slate-100 bg-white"
            }}
          >
            {[
                <SelectItem key="all" textValue={t.allTags} className="font-bold">
                  {t.allTags}
                </SelectItem>,
                ...TAGS.map(tTag => (
                <SelectItem key={tTag} textValue={tTag} className="font-bold">
                    {tTag}
                </SelectItem>
                ))
            ]}
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          <NoteCard isCreate={true} />
          {filteredNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </div>
  );
}