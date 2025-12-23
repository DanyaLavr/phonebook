import Register from "../components/register/Register";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto mt-10 max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Create Account
        </h1>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
