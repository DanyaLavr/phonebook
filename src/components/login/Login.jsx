import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../redux/user/operations";
import { selectUserIsLoading } from "../../redux/user/selectors";
import Loader from "../loader/Loader";
import { addNotification } from "../../redux/notifications/notificationsSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUserIsLoading);
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await dispatch(
      loginUser({ email: form.email.value, password: form.password.value })
    );
    if (loginUser.fulfilled.match(res))
      dispatch(
        addNotification({ message: "You’re now logged in", type: "success" })
      );
    if (loginUser.rejected.match(res))
      dispatch(
        addNotification({ message: "Something went wrong", type: "error" })
      );
    if (res.type.includes("fulfilled")) navigate("/contacts");
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>
      {isLoading && <Loader />}
      <button
        disabled={isLoading}
        type="submit"
        className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
