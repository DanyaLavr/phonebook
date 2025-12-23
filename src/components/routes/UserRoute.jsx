import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { Navigate } from "react-router-dom";

const UserRoute = ({ component: Component, redirectTo = "/login" }) => {
  const user = useSelector(selectUser);
  return user ? Component : <Navigate to={redirectTo} />;
};

export default UserRoute;
