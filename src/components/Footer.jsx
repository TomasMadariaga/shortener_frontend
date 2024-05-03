import { FaLinkedin } from "react-icons/fa6";
import { DiGithubBadge } from "react-icons/di";
import { FaYoutube } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="w-full h-auto bg-gray-700">
      <h3 className="text-center text-zinc-400 pt-3 underline underline-offset-8">
        This was made by Tomas Madariaga
      </h3>
      <ul className="flex pt-6 pb-4 gap-10 text-xl text-zinc-200 justify-center">
        <li>
          <a href="https://www.linkedin.com/in/tomas-madariaga-b8580725b/">
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a href="https://github.com/TomasMadariaga">
            <DiGithubBadge />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <FaYoutube />
          </a>
        </li>
      </ul>
    </footer>
  );
};
