import { InferGetServerSidePropsType, GetServerSideProps } from "next";

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
  data: NotesList | null;
};

export const getServerSideProps = (async (context) => {
  const { params } = context;
  const response = await fetch(
    `https://service.pace-unv.cloud/api/notes/${params?.id}`
  );
  const notes = await response.json();

  return { props: { notes } };
}) satisfies GetServerSideProps<{ notes: Notes }>;

export default function NotesServerPage({
  notes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!notes.data) {
    return <p className="text-center text-red-500">Note not found.</p>;
  }
  return (
    <div className="p-4">
      <div className="p-4 bg-white shadow-sm rounded-lg">
        <h1>{notes.data.title}</h1>
        <p>{notes.data.description}</p>
      </div>
    </div>
  );
}
