import Link from "next/link";
import CreateForm from "./create";

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
async function getNotes() {
  const notes: Notes = await fetch(
    "https://service.pace-unv.cloud/api/notes"
  ).then((res) => res.json());
  return notes;
}

export default async function Notes() {
  const notes = await getNotes();
  return (
    <>
      <CreateForm />
      <div className="grid grid-cols-4 gap-4 ">
        {notes.data.map((note: ListNotes) => {
          return (
            <Link
              href={`/notes/server/${note.id}`}
              key={note.id}
              className="p-4 bg-white shadow-sm rounded-lg"
            >
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
