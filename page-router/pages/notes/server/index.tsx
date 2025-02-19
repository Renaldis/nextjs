import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";

type NotesList = {
  id: string;
  title: string;
  description: string;
  deleted_all: string;
  created_at: string;
  updated_at: string;
};

type Notes = {
  success: boolean;
  message: string;
  data: NotesList[];
};

export const getServerSideProps = (async () => {
  const response = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await response.json();

  return { props: { notes } };
}) satisfies GetServerSideProps<{ notes: Notes }>;

export default function NotesServerPage({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h3 className="text-center text-2xl mb-4">NotesServerPage</h3>
      <div className="grid grid-cols-4 gap-4">
        {notes?.data.length > 0 ? (
          notes.data.map((note: NotesList) => (
            <Link
              href={`/notes/server/${note.id}`}
              key={note.id}
              className="p-4 bg-white shadow-sm rounded-lg"
            >
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-4">No notes available.</p>
        )}
      </div>
    </div>
  );
}
