import { useDispatch, useSelector } from "react-redux";

import { makeSelectCallsForContact } from "../../redux/calls/selectors";
import { deleteCall } from "../../redux/calls/operations";

export default function CallsList({ contactId, ids }) {
  const calls = useSelector(makeSelectCallsForContact(ids));
  const dispatch = useDispatch();
  const getDate = (time) => {
    return new Date(time).toLocaleString();
  };
  return (
    <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
      <h4 className="mb-2 text-sm font-medium text-gray-700">
        History of calls
      </h4>

      <ul className="space-y-2">
        {calls.map((elem) => (
          <li
            key={elem.id}
            className="flex items-center justify-between rounded-md bg-white px-3 py-2 shadow-sm"
          >
            <p className="text-xs text-gray-600">{getDate(elem.time)}</p>

            <button
              onClick={() =>
                dispatch(deleteCall({ contactId, callId: elem.id }))
              }
              className="
                rounded-md px-2 py-1
                text-xs font-medium text-red-500
                transition hover:bg-red-50
              "
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
