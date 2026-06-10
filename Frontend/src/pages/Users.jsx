import { useLoaderData } from "react-router-dom";

export default function Users() {
  const users = useLoaderData();

  return (
    <div className="p-4">
      <h1
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Users
      </h1>
    </div>
  );
}
