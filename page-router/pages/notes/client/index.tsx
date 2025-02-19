import Link from "next/link";
import useSWR from "swr";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NoteClientPage() {
  const { data, error, isLoading } = useSWR(
    `https://service.pace-unv.cloud/api/notes/`,
    fetcher,
    {
      //   revalidateOnFocus: true,
      refreshInterval: 3000,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      Client Notes
      <div className="grid grid-cols-4 gap-4">
        {data?.data.length > 0 ? (
          data.data.map((note: NotesList) => (
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
