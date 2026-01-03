import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../redux/user/operations";
import { selectUserIsLoading } from "../../redux/user/selectors";
import Loader from "../loader/Loader";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUserIsLoading);
  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const res = await dispatch(
      registerUser({
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
      })
    );
    if (registerUser.fulfilled.match(res))
      dispatch(
        addNotification({ message: "Thanks for signing up!", type: "success" })
      );
    if (registerUser.rejected.match(res))
      dispatch(
        addNotification({ message: "Something went wrong", type: "error" })
      );
    if (res.type.includes("fulfilled")) navigate("/contacts");
  };
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
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
          id="password"
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
        Register
      </button>
    </form>
  );
};

export default Register;
