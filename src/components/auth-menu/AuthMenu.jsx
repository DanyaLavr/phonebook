import { NavLink } from "react-router-dom";

const AuthMenu = () => {
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-1 text-sm font-medium transition ${
      isActive ? "bg-green-500 text-white" : "text-gray-700 hover:bg-green-100"
    }`;

  return (
    <ul className="flex items-center gap-2">
      <li>
        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" className={linkClass}>
          Register
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthMenu;
