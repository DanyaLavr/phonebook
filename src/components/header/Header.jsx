import { useSelector } from "react-redux";

import { selectUser } from "../../redux/user/selectors";

import AuthMenu from "../auth-menu/AuthMenu";
import Navigation from "../navigation/Navigation";
import UserMenu from "../user-menu/UserMenu";

const Header = () => {
  const user = useSelector(selectUser);

  return (
    <header className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <Navigation />
        <div>{user ? <UserMenu /> : <AuthMenu />}</div>
      </div>
    </header>
  );
};

export default Header;
