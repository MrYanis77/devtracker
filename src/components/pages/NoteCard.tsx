"use client";

import React, { useState } from "react";
import { 
  Card, CardBody, Button, Chip, Input, Textarea, Select, SelectItem
} from "@heroui/react";
import { useApp, Note } from "@/Context/AppContext";

const TAGS = ["React", "CSS", "DevOps", "IA", "TypeScript", "JavaScript"];

export const NoteCard = ({ note, isCreate }: { note?: Note; isCreate?: boolean }) => {
  const { addNote, updateNote, deleteNote } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(note || { title: "", content: "", tag: "React" });
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const handleAction = () => {
    if (!form.title || !form.content) return alert("Title and content are required!");
    if (isCreate) {
      addNote(form);
      setForm({ title: "", content: "", tag: "React" });
    } else {
      updateNote(note!.id, form);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (isCreate) {
      setForm({ title: "", content: "", tag: "React" });
    } else {
      setForm(note!);
      setIsEditing(false);
    }
  };

  if (isCreate || isEditing) {
    return (
      <Card className="p-0 bg-white shadow-xl rounded-24px border border-slate-100 w-full h-fit overflow-visible flex flex-col transition-all">
        <CardBody className="flex flex-col p-6 gap-y-6 overflow-visible h-full">
  
          <Input 
            label="Titre" 
            labelPlacement="outside"
            placeholder="Entrer un titre..."
            variant="flat"
            value={form.title} 
            onValueChange={(v) => setForm({...form, title: v})}
            classNames={{ 
              base: "pt-2",
              label: "font-bold text-slate-700 mb-2 block relative", 
              inputWrapper: "bg-slate-50 border-none rounded-xl h-12 shadow-sm shrink-0",
            }}
          />

          <div className={`flex flex-col flex-1 rounded-2xl transition-all duration-300 border-2 h-fit ${
            isTextareaFocused ? "bg-white border-blue-100 shadow-md" : "bg-slate-50 border-transparent"
          }`}>
            <Textarea 
              label="Contenu" 
              labelPlacement="inside"
              placeholder="Alors ?"
              variant="flat"
              minRows={1}
              value={form.content} 
              onValueChange={(v) => setForm({...form, content: v})}
              onFocus={() => setIsTextareaFocused(true)}
              onBlur={() => setTimeout(() => setIsTextareaFocused(false), 200)}
              classNames={{ 
                base: "bg-transparent h-fit",
                label: "font-bold text-slate-500",
                inputWrapper: "bg-transparent shadow-none border-none h-fit", 
                input: "text-slate-700 leading-relaxed resize-y py-2" 
              }}
            />
          </div>

          <Select 
            placeholder="Selectionner un tag"
            variant="flat"
            selectedKeys={[form.tag]}
            selectorIcon={<span />} 
            popoverProps={{ 
                portalContainer: typeof document !== "undefined" ? document.body : undefined,
                offset: 5,
                classNames: {
                content: "!bg-white shadow-2xl border border-slate-100/50 p-1 rounded-2xl min-w-[180px]",
                }
            }}
            onSelectionChange={(k) => setForm({...form, tag: Array.from(k)[0] as string})}
            classNames={{
                base: "shrink-0 w-fit",
                trigger: "!bg-white border border-slate-200/60 h-10 px-4 rounded-xl shadow-sm hover:!bg-slate-50 transition-all",
                value: "font-bold text-slate-700 text-sm",
            }}
            >
            {TAGS.map(t => (
                <SelectItem 
                key={t} 
                textValue={t} 
                className="rounded-xl transition-colors data-[hover=true]:bg-slate-100"
                classNames={{
                    title: "font-bold text-slate-800 py-1"
                }}
                >
                {t}
                </SelectItem>
            ))}
        </Select>

          {!isTextareaFocused && (
            <div className="flex gap-3 justify-end mt-2 animate-appearance-in shrink-0">
              <Button 
                size="sm" 
                variant="light" 
                className="font-bold text-slate-400 hover:text-slate-600" 
                onPress={handleCancel}
              >
                Annuler
              </Button>
              <Button 
                size="sm"
                className="bg-blue-600 text-white font-bold px-8 rounded-full shadow-lg shadow-blue-100" 
                onPress={handleAction}
              >
                {isCreate ? "Ajouter" : "Sauvegarder"}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="p-5 bg-white shadow-md rounded-[22px] border border-slate-50 h-fit group transition-all">
      <CardBody className="p-0 flex flex-col gap-3">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{note?.title}</h3>
        <p className="text-slate-500 text-sm whitespace-pre-wrap leading-relaxed">{note?.content}</p>
        <div className="flex justify-between items-center pt-3 border-t border-slate-50 mt-auto">
          <Chip size="sm" variant="flat" className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px]">{note?.tag}</Chip>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button isIconOnly size="sm" variant="light" radius="full" onPress={() => setIsEditing(true)}>✏️</Button>
            <Button isIconOnly size="sm" variant="light" radius="full" color="danger" onPress={() => deleteNote!(note!.id)}>🗑️</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};