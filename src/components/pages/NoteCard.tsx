import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { useApp, Note } from "@/Context/AppContext";

export const NoteCard = ({ note }: { note: Note }) => {
  const { deleteNote } = useApp();

  return (
    <Card className="p-2 border-none shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="justify-between">
        <h3 className="font-bold uppercase truncate max-w-[150px]">{note.title}</h3>
        <Chip size="sm" color="secondary" variant="flat">{note.tag}</Chip>
      </CardHeader>
      
      <CardBody className="text-sm text-default-600 line-clamp-4">
        {note.content}
      </CardBody>
      
      <CardFooter className="justify-between items-center border-t border-default-100 mt-2 pt-3">
        <span className="text-tiny text-default-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
        <Button 
          isIconOnly 
          color="danger" 
          variant="light" 
          size="sm"
          onPress={() => {
            if(confirm("Supprimer cette note ?")) deleteNote(note.id);
          }}
        >
          🗑️
        </Button>
      </CardFooter>
    </Card>
  );
};