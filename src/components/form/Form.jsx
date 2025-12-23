import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";

import { addContact } from "../../redux/contacts/operations";
import { selectContacts } from "../../redux/contacts/contactsSlice";

export default function Form() {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const checkIsRegistered = ({ name, number }) => {
    return contacts.some(
      (elem) => elem.name === name || elem.number === number
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const id = nanoid();
    const contact = { id };

    for (let [key, value] of formData.entries()) {
      contact[key] = value.trim();
    }

    if (checkIsRegistered(contact)) {
      alert("You already have this contact");
      return;
    }
    dispatch(addContact(contact));
    form.reset();
  };
  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="mb-6 space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="">
        <label
          htmlFor=""
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          className="
            w-full rounded-lg border border-gray-200
            px-3 py-2 text-sm text-gray-800
            outline-none transition
            focus:border-green-500 focus:ring-2 focus:ring-green-200
          "
          required
        />
      </div>

      <div className="">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Number
        </label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          className="
            w-full rounded-lg border border-gray-200
            px-3 py-2 text-sm text-gray-800
            outline-none transition
            focus:border-green-500 focus:ring-2 focus:ring-green-200
          "
          required
        />
      </div>

      <button
        type="submit"
        className="
          w-full rounded-lg
          bg-green-500 px-4 py-2
          text-sm font-medium text-white
          transition hover:bg-green-600
        "
      >
        Add contact
      </button>
    </form>
  );
}
