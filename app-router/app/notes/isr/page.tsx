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

export const revalidate = 60;

export const dynamicParams = true;

// export async function generateStaticParams() {
//   const notes: Notes = await fetch(
//     "https://service.pace-unv.cloud/api/notes"
//   ).then((res) => res.json());

//   return notes.data.map((note: ListNotes) => ({
//     id: note.id.toString(),
//   }));
// }

export default async function Notes() {
  const notes: Notes = await fetch(
    "https://service.pace-unv.cloud/api/notes"
  ).then((res) => res.json());

  console.log(notes);
  return (
    <ul>
      {notes.data.map((note) => {
        return (
          <li
            key={note.id}
            style={{
              border: "1px solid black",
              marginBottom: "10px",
              padding: "8px",
            }}
          >
            <a href={`/notes/isr/${note.id}`}>{note.title}</a>
          </li>
        );
      })}
    </ul>
  );
}
