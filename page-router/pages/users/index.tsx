import Link from "next/link";

export default function UsersPage() {
  return (
    <>
      <h1>Users Page</h1>
      <ul>
        <li>
          <Link href={"/users/1"}>Users 1</Link>
        </li>
      </ul>
    </>
  );
}
