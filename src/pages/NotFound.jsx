import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl text-text-h mb-4">Page not found</h2>
      <p className="text-text mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-accent hover:underline">
        Go back home →
      </Link>
    </div>
  );
};