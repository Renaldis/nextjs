"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createNote } from "./action";

type FormCreate = {
  title: string;
  description: string;
};

type ErrorResponse = {
  errors: { [key: string]: string };
};

const initialState = {
  message: "",
  errors: {
    title: "",
    description: "",
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer disabled:opacity-50"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

export default function CreateForm() {
  const [state, formAction] = useActionState(createNote, initialState);
  console.log(state);
  return (
    <div className="max-w mx-auto p-6 bg-white shadow-lg mb-10 rounded-lg sticky top-0">
      <h2 className="text-xl font-semibold mb-4">Create Note</h2>
      <form className="space-y-4" action={formAction}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Input title ..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            {state?.errors?.title && (
              <small className="text-red-500">{state.errors.title}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Input description ..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            />
            {state?.errors?.description && (
              <small className="text-red-500">{state.errors.description}</small>
            )}
          </div>
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}
