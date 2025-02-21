export const revalidate = 60;

export const dynamicParams = true;

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

type DetailNote = {
  success: string;
  message: string;
  data: ListNotes;
};

export async function generateStaticParams() {
  const notes: Notes = await fetch(
    "https://service.pace-unv.cloud/api/notes"
  ).then((res) => res.json());

  return notes.data.map((note: ListNotes) => ({
    id: note.id.toString(),
  }));
}

export default async function Notes({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notes: DetailNote = await fetch(
    `https://service.pace-unv.cloud/api/notes/${id}`
  ).then((res) => res.json());
  return (
    <div>
      <p>{notes.data.title}</p>
      <p>{notes.data.description}</p>
    </div>
  );
}
