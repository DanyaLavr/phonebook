import Login from "../components/login/Login";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto mt-10 max-w-md">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Please log in to access your contacts from any platform.
          </p>
          <Login />
        </div>
      </div>
    </div>
  );
}
