import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-bg/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            className="text-text-h font-bold text-xl hover:text-accent transition-colors"
            to="/"
          >
            Shortener
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-accent-bg/50 text-text text-sm hover:border-accent hover:bg-accent-bg transition-all cursor-pointer"
                >
                  <FaUserCircle className="w-4 h-4 text-accent" />
                  {user?.username}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-text hover:bg-accent-bg transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-accent-bg transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/register" className="text-text hover:text-accent transition-colors">
                  Sign Up
                </Link>
                <Link to="/login" className="text-text hover:text-accent transition-colors">
                  Sign In
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            {isAuthenticated ? (
              <div className="relative" ref={mobileMenuRef}>
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-accent-bg/50 text-accent hover:border-accent hover:bg-accent-bg transition-all"
                >
                  <FaUserCircle className="w-5 h-5" />
                </button>

                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-2 text-xs text-text border-b border-border">
                      {user?.username}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-text hover:bg-accent-bg transition"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-text hover:bg-accent-bg transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-accent-bg/50 text-accent hover:border-accent hover:bg-accent-bg transition-all"
              >
                <FaUserCircle className="w-5 h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};