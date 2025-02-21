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
    <ul>
      {notes.data.map((note: ListNotes) => {
        return <li key={note.id}>{note.title}</li>;
      })}
    </ul>
  );
}
