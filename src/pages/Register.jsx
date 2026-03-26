import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/shorter");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <div className="grow flex items-center justify-center px-4 py-12 bg-bg">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-h">Create an account</h1>
          <p className="text-text mt-2">Get started with URL shortener</p>
        </div>

        <div className="bg-card/30 border border-border rounded-xl p-6 sm:p-8 backdrop-blur-sm">
          {registerErrors && registerErrors.length > 0 && (
            <div className="mb-6 space-y-2">
              {registerErrors.map((error, i) => (
                <div
                  key={i}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm text-center"
                >
                  {error}
                </div>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-text text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
                className={`w-full px-4 py-2.5 rounded-lg border bg-transparent text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all ${
                  errors.username ? "border-red-500" : "border-border"
                }`}
                placeholder="johndoe"
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-text text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-4 py-2.5 rounded-lg border bg-transparent text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-text text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-4 py-2.5 rounded-lg border bg-transparent text-text placeholder:text-text/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all ${
                  errors.password ? "border-red-500" : "border-border"
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-linear-to-r from-accent to-accent/80 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              Create account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:underline transition">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};