import { useEffect } from "react";
import {
  Form,
  useLoaderData,
  useSearchParams,
  NavLink,
} from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/dashboard.css";

export default function Dashboard() {
  const user = useLoaderData(); // fetched from userLoader loader
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("loggedin") === "success") {
      toast.success("Logged in successfully!");
      setSearchParams({});
    }

    if (searchParams.get("edited") === "success") {
      toast.success("User details updated successfully!");
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  if (!user) return <h1>Loading user data...</h1>;

  return (
    <section className="dashboard">
      <h1>Dashboard</h1>
      <h2>Welcome {user.name}!</h2>

      <div>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Mobile:</strong> {user.mobile}
        </p>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
      </div>

      <div className="dashboard-links">
        <NavLink to="/edit">
          <button>Edit Details</button>
        </NavLink>

        <Form method="post">
          <button type="submit">Logout</button>
        </Form>
      </div>
    </section>
  );
}
