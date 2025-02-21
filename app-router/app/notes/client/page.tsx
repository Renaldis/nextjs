"use client";
import { useEffect, useState } from "react";

type ListNotes = {
  id: string;
  title: string;
  description: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

type Notes = {
  success: string;
  message: string;
  data: ListNotes[];
};

export default function NotesClient() {
  const [notes, setNotes] = useState<ListNotes[]>([]);

  useEffect(() => {
    async function getNotes() {
      const notes: Notes = await fetch(
        "https://service.pace-unv.cloud/api/notes"
      ).then((res) => res.json());
      setNotes(notes.data);
    }
    getNotes();
  }, []);

  return (
    <ul>
      {notes.map((note: ListNotes) => {
        return <li key={note.id}>{note.title}</li>;
      })}
    </ul>
  );
}
