import { NavLink, useRouteLoaderData } from "react-router-dom";
import "../assets/css/header.css";

export default function Header() {
  const authData = useRouteLoaderData("root");
  const isLoggedIn = authData.isLoggedIn;

  return (
    <header>
      <nav className={isLoggedIn ? "nav-col" : ""}>
        <div>
          <NavLink to="/" className="nav-link">
            SecureAuth
          </NavLink>
        </div>
        <div>
          <ul>
            <li>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            {isLoggedIn ? (
              <>
                {" "}
                <li>
                  <NavLink to="/dashboard" className="nav-link">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/colormixer" className="nav-link">
                    Color Mixer
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
