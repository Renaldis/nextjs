import { useRouter } from "next/router";
import { useState, FormEvent } from "react";

type FormCreate = {
  title: string;
  description: string;
};

type ErrorResponse = {
  errors: { [key: string]: string };
};

export default function NotesServerCreate() {
  const router = useRouter();
  const [payload, setPayload] = useState<FormCreate>({
    title: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/notes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data);
        return;
      }

      console.log("Success:", data);
      if (data.success) {
        setPayload({ title: "", description: "" });
        router.push("/notes/server");
      }
    } catch (error) {
      console.error("Error:", error);
      setError({
        errors: { general: "Something went wrong. Please try again later." },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Note</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
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
            value={payload.title}
            onChange={(event) =>
              setPayload((prev) => ({ ...prev, title: event.target.value }))
            }
            placeholder="Input title ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error?.errors?.title && (
            <small className="text-red-500">{error.errors.title}</small>
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
            value={payload.description}
            onChange={(event) =>
              setPayload((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            placeholder="Input description ..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          />
          {error?.errors?.description && (
            <small className="text-red-500">{error.errors.description}</small>
          )}
        </div>
        {error?.errors?.general && (
          <small className="text-red-500">{error.errors.general}</small>
        )}
        <button
          type="submit"
          className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
