import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { selectUser } from "../../redux/user/selectors";

export default function Navigation() {
  const user = useSelector(selectUser);

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-1 text-sm font-medium transition ${
      isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-green-100"
    }`;

  return (
    <nav>
      <ul className="flex items-center gap-2">
        <li>
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLink to="/contacts" className={linkClass}>
              Contacts
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
