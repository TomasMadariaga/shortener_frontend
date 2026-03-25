import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const verify = async () => {
      if (isAuthenticated) {
        navigate("/shorter");
      }
    };
    verify();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.title = "Shortener";
  }, []);

  return (
    <div className="py-5 grow flex items-center justify-center bg-bg px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Ícono/Ilustración */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent-bg border border-accent/30">
            <svg
              className="w-10 h-10 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m1.172-4.172l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-4xl sm:text-5xl font-bold text-text-h mb-4">
          Shorten Your URLs
        </h1>
        
        {/* Descripción */}
        <p className="text-text text-lg mb-8 max-w-md mx-auto">
          Create short, memorable links in seconds. Track clicks and manage all your shortened URLs in one place.
        </p>

        {/* Call to action */}
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

        {/* Feature highlights */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-3 sm:gap-6">
            <div>
              <div className="text-accent mb-2">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-text-h font-medium mb-1">Fast</h3>
              <p className="text-text text-sm">Instant short links</p>
            </div>
            <div>
              <div className="text-accent mb-2">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-text-h font-medium mb-1">Trackable</h3>
              <p className="text-text text-sm">Monitor click stats</p>
            </div>
            <div>
              <div className="text-accent mb-2">
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-10V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v5m4-5v5" />
                </svg>
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