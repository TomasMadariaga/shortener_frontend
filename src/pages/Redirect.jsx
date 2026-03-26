import { useEffect, useState, useRef } from "react";
import { useUrl } from "../context/UrlContext";
import { useParams } from "react-router-dom";
import { formatUrl } from "../utils/formatUrl";

export const Redirect = () => {
  const { redirectTo } = useUrl();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;

    const redirect = async () => {
      try {
        const response = await redirectTo(id);
        
        if (!response || !response.data) {
          setError(true);
          setLoading(false);
          return;
        }

        const redirectUrl = response.data.redirectUrl;

        if (!redirectUrl) {
          setError(true);
          setLoading(false);
          return;
        }

        const normalizedUrl = formatUrl(redirectUrl);
        window.location.href = normalizedUrl;
        
      } catch (err) {
        console.error("Redirect error:", err);
        setError(true);
        setLoading(false);
      }
    };

    redirect();
  }, [id, redirectTo]);

  useEffect(() => {
    document.title = "Redirecting...";
  }, []);

  if (error) {
    return (
      <div className="grow flex items-center justify-center bg-bg">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-red-400/50 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-text-h text-xl font-medium mb-2">
            Link not found
          </h2>
          <p className="text-text mb-6">
            The URL you're trying to access doesn't exist or has expired.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition"
          >
            Go to Shortener
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-accent/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
        </div>
        <p className="text-text-h font-medium text-lg">Redirecting...</p>
        <p className="text-text text-sm mt-2">
          You'll be redirected in a moment
        </p>
      </div>
    </div>
  );
};