"use client";

import Image from "next/image";
import styles from "./page.module.css";
// import { useCount } from "@/context";
import { dataStore } from "@/store/dataStore";

export default function Home() {
  // const { setCount } = useCount();
  const { inc, count } = dataStore();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ol>
          <li>Welcome to the course</li>
          <li>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          </li>
          <li>
            <button
              onClick={() => inc()}
              className="border rounded-full bg-slate-200 cursor-pointer active:bg-slate-400 p-2"
            >
              Increment++
            </button>
          </li>
        </ol>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
