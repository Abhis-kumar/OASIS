import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-red-500">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
          >
            <Home size={20} />
            Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-200 px-6 py-3 rounded-lg transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;