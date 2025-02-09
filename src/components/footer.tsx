import { socialLinks } from "../data";

export const Footer = () => {
  return (
    <footer className="font-body mt-40 bg-dark text-xl text-white">
      <div className="container mx-auto flex min-h-40 flex-col items-center justify-center gap-x-7 gap-y-3 px-5 py-6 sm:flex-row">
        {socialLinks.map(({ id, label, link }) => (
          <a key={id} href={link} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
};
