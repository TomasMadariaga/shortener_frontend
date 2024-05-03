import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-gray-700 flex h-auto p-5 text-lg">
      <Link className="text-white font-bold" to="/">
        Shortener
      </Link>
      <ul className="flex justify-end w-full px-6 gap-8">
        {isAuthenticated ? (
          <>
            <li className="text-white font-bold">Welcome {user.username}</li>
            <li className="text-white font-bold"><Link to='/dashboard'>Dashboard</Link></li>
            <li className="text-white font-bold">
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-white font-bold">
              <Link to="/register">Sign Up</Link>
            </li>
            <li className="text-white font-bold">
              <Link to="/login">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
