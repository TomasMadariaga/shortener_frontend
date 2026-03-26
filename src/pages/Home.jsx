import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaLink, FaBolt, FaChartLine, FaShieldAlt } from "react-icons/fa";

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/shorter");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.title = "Shortener";
  }, []);

  return (
    <div className="grow flex items-center justify-center bg-bg px-4 py-5">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-bg border border-accent/30">
            <FaLink className="w-10 h-10 text-accent" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-text-h mb-4">
          Shorten Your URLs
        </h1>
        
        <p className="text-text text-lg mb-8 max-w-md mx-auto">
          Create short, memorable links in seconds. Track clicks and manage all your shortened URLs in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-white transition"
          >
            Create account
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="group hover:-translate-y-1 transition-transform duration-200">
              <div className="text-accent mb-2 flex justify-center">
                <FaBolt className="w-6 h-6" />
              </div>
              <h3 className="text-text-h font-medium mb-1">Fast</h3>
              <p className="text-text text-sm">Instant short links</p>
            </div>
            <div className="group hover:-translate-y-1 transition-transform duration-200">
              <div className="text-accent mb-2 flex justify-center">
                <FaChartLine className="w-6 h-6" />
              </div>
              <h3 className="text-text-h font-medium mb-1">Trackable</h3>
              <p className="text-text text-sm">Monitor click stats</p>
            </div>
            <div className="group hover:-translate-y-1 transition-transform duration-200">
              <div className="text-accent mb-2 flex justify-center">
                <FaShieldAlt className="w-6 h-6" />
              </div>
              <h3 className="text-text-h font-medium mb-1">Secure</h3>
              <p className="text-text text-sm">Your links are safe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};