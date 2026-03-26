export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-text-h font-name text-lg hover:text-accent transition-colors">
            Tomas Madariaga
          </h3>
          <p className="text-text text-xs">
            © {currentYear} Built with React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};