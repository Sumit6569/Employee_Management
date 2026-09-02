import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 text-center transition-colors">
      <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Page Not Found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white shadow-xs hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;