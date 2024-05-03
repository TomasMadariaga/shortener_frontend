import { useState, useRef } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
import { useUrl } from "../context/UrlContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const Shorter = () => {
  const inputRef = useRef();
  const [URL, setURL] = useState("");
  const { create } = useUrl();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    const url = await create(values);
    setURL(url);
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const { token } = Cookies.get();
  //   const url = inputRef.current.value;
  //   try {
  //     console.log(token)
  //     await axios
  //       .post(
  //         "http://localhost:3000/u",
  //         { url },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((res) => setURL(res.data));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex items-center bg-gray-700 justify-center w-full h-4/5">
      <main className="p-5 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Shortener</h1>
        <div className="flex justify-center">
          <form onSubmit={onSubmit} className="flex items-center space-x-4">
            <input
              type="text"
              ref={inputRef}
              {...register("url", { required: true })}
              placeholder="URL"
              className="px-4 py-2 rounded-md border border-gray-500 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Acortar
            </button>
          </form>
        </div>
        {URL && (
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2">
              <span>
                <Link className="text-blue-500 hover:underline" to={`/${URL}`}>{`http://localhost:5173/${URL}`}</Link>
                {/* <a
                  id="url"
                  href={`http://localhost:3000/u/${URL}`}
                  className="text-blue-500 hover:underline"
                >
                  {`http://localhost:3000/u/${URL}`}
                </a> */}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
