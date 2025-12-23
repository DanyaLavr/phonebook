import Form from "../components/form/Form";
import ContactsList from "../components/contactsList/ContactsList";
import Finder from "../components/finder/Finder";

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto w-full max-w-md space-y-6">
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Phonebook
        </h1>
        <Form />
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-gray-700">Contacts</h2>
          <Finder />
          <ContactsList />
        </div>
      </div>
    </div>
  );
}
