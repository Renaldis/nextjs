"use client";

// import { useCount } from "@/context";
import { dataStore } from "@/store/dataStore";

export default function About() {
  // const { setCount } = useCount();
  const { inc } = dataStore();
  return (
    <div>
      <h1 className="bg-blue-800">About Page</h1>
      <button
        // onClick={() => setCount((prevCount: number) => prevCount + 1)}
        onClick={() => inc()}
        className="border rounded-full bg-slate-200 cursor-pointer active:bg-slate-400 p-2"
      >
        Increment++
      </button>
    </div>
  );
}
