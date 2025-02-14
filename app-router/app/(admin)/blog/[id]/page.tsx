// export default async function BlogDetail({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   return <h1>Details about Blog {id}</h1>;
// }

"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function BlogDetail() {
  const params = useParams();
  const search = useSearchParams();

  //   const query = search.get("user");
  const query = Object.fromEntries(search.entries());

  console.log(query);
  console.log(params.id);
  return (
    <>
      <h1>
        Blog Detail Page Dynamic: {params.id}, query user: {query.user}, age:
        {query.age}
      </h1>
      <div className="flex gap-2 mt-2">
        <button className="px-3 text-white rounded-full bg-blue-400">
          <Link href={"/blog/pace?user=satu"}>satu</Link>
        </button>
        <button className="px-3 text-white rounded-full bg-blue-400">
          <Link href={"/blog/pace?user=dua"}>dua</Link>
        </button>
      </div>
    </>
  );
}
