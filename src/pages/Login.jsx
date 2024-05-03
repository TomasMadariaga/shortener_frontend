import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/shorter");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center bg-gray-700">
      <div className="bg-zinc-700 max-w-md w-full p-10 rounded-md border">
        {loginErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white text-center my-2">
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold text-white">Sign In</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="flex gap-x-2 justify-between text-white">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-white hover:text-sky-500 hover:underline hover:underline-offset-4"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
