import { GetStaticProps, InferGetStaticPropsType } from "next";
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

export const getStaticProps = (async () => {
  const response = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await response.json();

  return { props: { notes }, revalidate: 3 };
}) satisfies GetStaticProps<{ notes: Notes }>;

export default function NotesStaticPage({
  notes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {notes?.data.map((note: NotesList) => {
          return (
            <Link
              href={`/notes/ssg/${note.id}`}
              key={note.id}
              className="p-4 bg-white shadow-sm rounded-lg"
            >
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
