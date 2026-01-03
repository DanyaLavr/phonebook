import { useSelector } from "react-redux";
import { selectNotifications } from "../../redux/notifications/selectors";
import Notification from "./Notification";

const NotificationsContainer = () => {
  const notifications = useSelector(selectNotifications);
  console.log("notifications :>> ", notifications);
  return (
    <>
      {notifications?.map((elem) => (
        <Notification key={elem.id} notification={elem} />
      ))}
    </>
  );
};

export default NotificationsContainer;
