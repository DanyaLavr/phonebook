import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../redux/notifications/notificationsSlice";
import { useEffect } from "react";

const Notification = ({ notification }) => {
  const dispatch = useDispatch();
  const { id, message, type } = notification;
  useEffect(() => {
    setTimeout(() => dispatch(removeNotification(id)), 7000);
  }, []);
  return createPortal(
    <div
      key={id}
      onClick={() => dispatch(removeNotification(id))}
      className={`
            cursor-pointer rounded-xl px-4 py-3 text-sm font-medium shadow-lg
            transition-all duration-300 hover:scale-105 fixed top-10 right-7
            ${type === "success" && "bg-green-500 text-white"}
            ${type === "error" && "bg-red-500 text-white"}

          `}
    >
      {message}
    </div>,
    document.getElementById("notifications-container")
  );
};

export default Notification;
