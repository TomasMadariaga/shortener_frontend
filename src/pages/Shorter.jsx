import { useState, useRef, useEffect } from "react";
import { useUrl } from "../context/UrlContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { getClientUrl } from "../utils/clientUrl";

export const Shorter = () => {
  const inputRef = useRef();
  const [URL, setURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { create, checkSlug, checkingSlug, slugAvailable } = useUrl();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const clientUrl = getClientUrl();
  const customSlug = watch("customSlug");

  useEffect(() => {
    if (!customSlug || customSlug.length < 3) return;
    checkSlug(customSlug);
  }, [customSlug, checkSlug]);

  const onSubmit = handleSubmit(async (values) => {
    if (values.customSlug && slugAvailable !== true) {
      toast.error("Please choose an available slug", {
        position: "top-center",
        pauseOnHover: false,
        autoClose: 3000,
        closeButton: false,
        className: "text-center",
      });
      return;
    }

    setIsLoading(true);
    try {
      const url = await create({ values });
      setURL(url);
      toast.success("URL created!", {
        position: "top-center",
        pauseOnHover: false,
        autoClose: 3000,
        closeButton: false,
        className: "text-center",
      });
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    document.title = "Shortener";
  }, []);

  useEffect(() => {
    if (errors?.url?.message) {
      toast.error(`${errors.url.message}`, {
        position: "top-center",
        pauseOnHover: false,
        autoClose: 3000,
        closeButton: false,
        className: "text-center",
      });
    }
  }, [errors]);

  return (
    <div className="grow py-14 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20px 20px, var(--color-accent) 1px, transparent 1px),
              radial-gradient(circle at 40px 40px, var(--color-accent) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px, 80px 80px",
            opacity: 0.1,
          }}
        />
        <div className="absolute top-0 -left-20 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="inline-block mb-4">
            <div className="px-4 py-1 rounded-full bg-accent-bg border border-accent/30 text-accent text-sm font-medium">
              URL Shortener
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-text-h to-accent bg-clip-text text-transparent mb-3">
            Shortener
          </h1>
          <p className="text-text max-w-md mx-auto">
            Paste your long URL and get a short, shareable link in seconds.
          </p>
        </div>

        <div className="relative rounded-2xl border border-border bg-card/40 backdrop-blur-sm p-6 shadow-xl">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m1.172-4.172l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <input
                type="text"
                ref={inputRef}
                {...register("url", {
                  required: true,
                  pattern: {
                    value:
                      /^(https?:\/\/(?:www\.)?|www\.|[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b)([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                    message: "The URL is invalid",
                  },
                })}
                placeholder="https://example.com/very-long-url..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-bg/50 text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text/40 text-sm pointer-events-none">
                  {clientUrl.replace("https://", "").replace("http://", "")}/
                </div>
                <input
                  type="text"
                  {...register("customSlug", {
                    pattern: {
                      value: /^[a-zA-Z0-9_-]{3,20}$/,
                      message: "3-20 characters (letters, numbers, underscore, hyphen)",
                    },
                  })}
                  placeholder="custom-slug (optional)"
                  className="w-full pl-44 pr-4 py-3 rounded-xl border border-border bg-bg/50 text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-linear-to-r from-accent to-accent/80 text-white rounded-xl hover:opacity-90 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Shortening...
                    </>
                  ) : (
                    <>
                      Shorten URL
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>

            {customSlug && customSlug.length >= 3 && (
              <div className="text-sm">
                {checkingSlug ? (
                  <p className="text-text/50 flex items-center gap-1">
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Checking availability...
                  </p>
                ) : slugAvailable === true ? (
                  <p className="text-green-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Available!
                  </p>
                ) : slugAvailable === false ? (
                  <p className="text-red-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Slug already taken
                  </p>
                ) : null}
              </div>
            )}
            {errors.customSlug && (
              <p className="text-red-400 text-sm">{errors.customSlug.message}</p>
            )}
          </form>

          {URL && (
            <div className="mt-6 p-4 rounded-xl border border-accent/30 bg-accent-bg/30">
              <p className="text-text text-xs mb-2 flex items-center gap-1">
                <svg className="w-3 h-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Your shortened URL:
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Link
                  to={`/${URL}`}
                  className="text-accent hover:underline break-all font-mono text-sm group flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${clientUrl}/${URL}`}
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${clientUrl}/${URL}`);
                    toast.success("Copied to clipboard!", {
                      position: "top-center",
                      autoClose: 2000,
                    });
                  }}
                  className="px-4 py-1.5 text-sm border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition flex items-center gap-1 group"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          )}

          {user && (
            <div className="mt-6 text-center border-t border-border pt-4">
              <Link
                to="/dashboard"
                className="text-sm text-accent hover:underline inline-flex items-center gap-1 group"
              >
                View your links
                <svg className="w-3 h-3 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};