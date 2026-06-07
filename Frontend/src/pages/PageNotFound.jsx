import { NavLink } from "react-router-dom";
import "../assets/css/pagenotfound.css";
export default function PageNotFound() {
  return (
    <section className="notfound">
      <h1>Page not found - 404</h1>
      <h2>kindly redirect to home page</h2>
      <h3>
        <NavLink to="/">Home</NavLink>
      </h3>
    </section>
  );
}
