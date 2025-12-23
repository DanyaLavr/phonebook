import Form from "../components/form/Form";
import ContactsList from "../components/contactsList/ContactsList";
import Finder from "../components/finder/Finder";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/user/selectors";
import { Link } from "react-router-dom";
import InfoBlock from "../components/info-block/InfoBlock";

export default function HomePage() {
  const user = useSelector(selectUser);
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Phonebook
        </h1>
        {user ? (
          <div className="rounded-xl bg-white p-6 shadow space-y-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user.name} 👋
            </h2>

            <p className="text-gray-600">
              You’re logged in. Go to your contacts to manage calls and numbers.
            </p>

            <Link
              to="/contacts"
              className="inline-block rounded-lg bg-green-500 px-5 py-2 text-white font-medium hover:bg-green-600 transition"
            >
              Go to Contacts
            </Link>
          </div>
        ) : (
          <>
            <Form />

            <div className="space-y-3">
              <h2 className="text-lg font-medium text-gray-700">Contacts</h2>
              <Finder />
              <InfoBlock
                title="Pro Tip 🌟"
                content="Log in to access your contacts on any platform: desktop, mobile, or
        tablet. Stay connected wherever you go!"
              />
              <ContactsList />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
