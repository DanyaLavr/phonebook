import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import CallsList from "../callsList/CallsList";
import ContactsLoader from "../contacts-loader/ContactsLoader";

import {
  selectContactsIsLoading,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";
import { addCall } from "../../redux/calls/operations";
import { deleteContact, fetchContacts } from "../../redux/contacts/operations";

export default function ContactsList() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectContactsIsLoading);
  const filteredContacts = useSelector(selectFilteredContacts);
  useEffect(() => {
    if (!filteredContacts.length) dispatch(fetchContacts());
  }, [filteredContacts.length, dispatch]);
  if (isLoading) return <ContactsLoader />;
  return (
    <ul className="space-y-3">
      {filteredContacts.map(({ id, name, number, calls }) => (
        <li
          key={id}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div
            className={` rounded-xl border border-gray-200 bg-white p-4 shadow-sm`}
          >
            <p className="text-sm font-medium text-gray-800">
              {name} <span className="ml-2 text-gray-500">{number}</span>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(addCall(id))}
                className="rounded-lg bg-green-500 px-3 py-1 text-sm text-white transition hover:bg-green-600"
              >
                Call
              </button>

              <button
                onClick={() => dispatch(deleteContact(id))}
                className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white transition hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          {calls?.length !== 0 && (
            <div className="mt-3">
              <CallsList contactId={id} ids={calls} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
