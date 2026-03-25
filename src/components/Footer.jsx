import { FaLinkedin } from "react-icons/fa6";
import { DiGithubBadge } from "react-icons/di";
import { FaYoutube } from "react-icons/fa6";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/tomas-madariaga/",
    },
    {
      name: "GitHub",
      icon: DiGithubBadge,
      href: "https://github.com/TomasMadariaga",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ];

  return (
    <footer className="border-t border-border bg-bg/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Nombre */}
          <h3 className="text-text-h font-name text-lg hover:text-accent transition-colors">
            Tomas Madariaga
          </h3>

          {/* Íconos sociales */}
          {/* <div className="flex gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text hover:text-accent transition-all hover:-translate-y-0.5"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div> */}

          {/* Copyright */}
          <p className="text-text text-xs">
            © {currentYear} — Built with React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};