const ContactsLoader = () => {
  return (
    <ul className="space-y-3">
      <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm animate-pulse">
        <div
          className={`grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm`}
        >
          <div className="flex gap-2">
            <span className=" rounded-xl block bg-gray-800 w-27 h-6"></span>
            <span className="  rounded-xl block bg-gray-500 w-24 h-6 "></span>
          </div>

          <div className="flex gap-2">
            <div className="rounded-lg bg-green-500 px-3 py-1 w-20 h-7  "></div>
            <div className="rounded-lg bg-red-500 px-3 py-1 w-20 h-7"></div>
          </div>
        </div>
      </li>
      <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm animate-pulse">
        <div
          className={`grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm`}
        >
          <div className="flex gap-2">
            <span className=" rounded-xl block bg-gray-800 w-27 h-6"></span>
            <span className="  rounded-xl block bg-gray-500 w-24 h-6 "></span>
          </div>

          <div className="flex gap-2">
            <div className="rounded-lg bg-green-500 px-3 py-1 w-20 h-7  "></div>
            <div className="rounded-lg bg-red-500 px-3 py-1 w-20 h-7"></div>
          </div>
        </div>
      </li>
      <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm animate-pulse">
        <div
          className={`grid gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm`}
        >
          <div className="flex gap-2">
            <span className=" rounded-xl block bg-gray-800 w-27 h-6"></span>
            <span className="  rounded-xl block bg-gray-500 w-24 h-6 "></span>
          </div>

          <div className="flex gap-2">
            <div className="rounded-lg bg-green-500 px-3 py-1 w-20 h-7  "></div>
            <div className="rounded-lg bg-red-500 px-3 py-1 w-20 h-7"></div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default ContactsLoader;
