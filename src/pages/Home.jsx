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
  }, [isAuthenticated]);

  return (
    <div className="h-4/5">
      <div className="bg-gray-700 p-8 flex w-full h-full justify-center items-center">
        <h2 className="text-zinc-200 text-xl">
          You need to sign in to use Shortener!{" "}
          <Link className="font-bold underline underline-offset-8" to="/login">
            Sign in
          </Link>
        </h2>
      </div>
    </div>
  );
};
