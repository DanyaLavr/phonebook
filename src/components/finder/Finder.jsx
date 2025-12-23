import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectFilter } from "../../redux/selectors";
import { setFilter } from "../../redux/filtersSlice";
import { selectContacts } from "../../redux/contacts/contactsSlice";

export default function Finder() {
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value.trim()));
  };

  useEffect(() => {
    dispatch(setFilter(""));
  }, [contacts]);

  return (
    <form className="mb-4">
      <label
        htmlFor="finder"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Find contact by name
      </label>
      <input
        type="text"
        name="finder"
        value={filter}
        onChange={handleChange}
        className="
      w-full rounded-xl border border-gray-200
      bg-white px-4 py-2 text-sm text-gray-800
      shadow-sm outline-none
      transition
      focus:border-green-500 focus:ring-2 focus:ring-green-200
    "
      />
    </form>
  );
}
