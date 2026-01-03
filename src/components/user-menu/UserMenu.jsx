import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "../../redux/user/selectors";
import { logoutUser } from "../../redux/user/operations";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../../redux/notifications/notificationsSlice";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
    dispatch(logoutUser());
    dispatch(
      addNotification({
        message: "Logout successful.",
        type: "success",
      })
    );
  };
  return (
    <div className="flex items-center gap-3">
      <p className="text-sm font-medium text-gray-700">
        Hi, <span className="text-gray-900">{user?.name}</span>
      </p>

      <button
        onClick={onClick}
        className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
      >
        Log out
      </button>
    </div>
  );
};

export default UserMenu;
