import { GetStaticProps, InferGetStaticPropsType } from "next";

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
  data: NotesList;
};

export const getStaticPaths = async () => {
  const notes = await fetch("https://service.pace-unv.cloud/api/notes").then(
    (res) => res.json()
  );
  const paths = notes.data.map((note: NotesList) => ({
    params: { id: note.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = (async (context) => {
  const { params } = context;
  const response = await fetch(
    `https://service.pace-unv.cloud/api/notes/${params?.id}`
  );
  const notes = await response.json();

  return { props: { notes } };
}) satisfies GetStaticProps<{ notes: Notes }>;

export default function NoteSSGDetailPage({
  notes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="p-4">
      <div className="p-4 bg-white shadow-sm rounded-lg">
        <h1>{notes.data.title}</h1>
        <p>{notes.data.description}</p>
      </div>
    </div>
  );
}
