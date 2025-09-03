import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const Error = ({ message = "Something went wrong!" }) => {
  return (
    <div className="flex items-start justify-center min-h-[calc(100vh-120px)] pt-20 pb-10 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 max-w-lg w-full text-center border border-gray-200 dark:border-gray-800">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 dark:bg-red-900/40 p-5 rounded-full shadow-inner">
            <AlertTriangle className="w-14 h-14 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Something went wrong
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
