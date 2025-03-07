import { useEffect, useRef, useState, useCallback } from "react";
import { navLinks } from "../data";
import { close, Logo, Menu } from "../assets/images";
import { cn } from "../lib/utils";

export const Header: React.FC<React.HTMLProps<HTMLElement>> = ({ className, ...props }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback((event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeMenu);
      document.addEventListener("scroll", closeMenu, { passive: true });
    } else {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("scroll", closeMenu);
    }

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("scroll", closeMenu);
    };
  }, [isOpen, closeMenu]);

  const renderNavLink = (link: { id: number; label: string; link: string }) => (
    <a
      key={link.id}
      href={link.link}
      target={link.link.startsWith("http") ? "_blank" : "_self"}
      rel={link.link.startsWith("http") ? "noopener noreferrer" : ""}
      onClick={() => setIsOpen(false)}
      className={cn("underline-offset-8 hover:underline [&.active]:underline", { "font-bold": link.label === "Resume" })}>
      {link.label}
    </a>
  );

  return (
    <header className={cn("fixed top-0 left-0 w-full z-40 backdrop-blur-lg bg-white/10", className)} {...props}>
      <div className="flex items-center justify-between p-5 2xl:px-20">
        {/* Logo */}
        <a href="/" className="flex items-center font-title font-medium">
          <Logo className="size-8 md:size-10" />
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="flex cursor-pointer flex-col items-center justify-center gap-1 sm:hidden">
          <Menu />
        </button>

        {/* Mobile Navigation Menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={cn(
            "fixed top-0 left-0 z-50 h-[36svh] w-full bg-accent-primary text-dark shadow transition-transform duration-300 ease-in-out sm:hidden",
            isOpen ? "translate-y-0" : "-translate-y-full",
          )}>
          <div className="flex justify-between p-5">
            {/* Logo */}
            <a href="/" className="flex items-center font-title font-medium">
              <Logo className="size-8 md:size-10" />
            </a>

            {/* Close Button */}
            <button type="button" onClick={toggleMenu} aria-label="Close Menu" className="cursor-pointer">
              <img src={close} alt="Close" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col items-center justify-center gap-y-5 text-lg">{navLinks.map(renderNavLink)}</nav>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden flex-wrap items-center justify-center gap-x-10 text-base sm:flex lg:gap-x-20">{navLinks.map(renderNavLink)}</nav>
      </div>
    </header>
  );
};
