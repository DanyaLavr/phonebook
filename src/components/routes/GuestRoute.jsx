import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ component: Component, redirectTo = "/" }) => {
  const user = useSelector(selectUser);
  return user ? <Navigate to={redirectTo} /> : Component;
};

export default GuestRoute;
