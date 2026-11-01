import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-white">
      <h1 className="text-3xl font-bold mb-4">Page not found</h1>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-300 underline">
        Return home
      </Link>
    </div>
  );
}

export default NotFound;
