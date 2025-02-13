import { useEffect, useRef, useState, useCallback } from "react";
import { navLinks } from "../data";
import { close, Logo, Menu } from "../assets/images";
import { cn } from "../lib/utils";

export const Header = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const closeMenu = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", closeMenu); // Clicks
      document.addEventListener("scroll", closeMenu, { passive: true }); // Scrolling
      document.addEventListener("mouseup", closeMenu); // Text selection
    }

    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("scroll", closeMenu);
      document.removeEventListener("mouseup", closeMenu);
    };
  }, [isOpen]);

  return (
    <header className={cn("bg-transparent/30 backdrop-blur-lg fixed top-0 left-0 w-full z-40", className)}>
      <div className="flex items-center justify-between p-5 2xl:px-20">
        {/* Logo */}
        <a href="/" className="flex items-center font-title font-medium">
          <Logo className={cn({ hidden: isOpen })} />
        </a>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} aria-label="Toggle Navigation Menu" aria-expanded={isOpen} aria-controls="mobile-menu" className="sm:hidden flex cursor-pointer flex-col items-center justify-center gap-1">
          {isOpen ? <img src={close} alt="Close Menu" /> : <Menu />}
        </button>

        {/* Mobile Navigation Menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={cn("fixed z-50 top-0 left-0 h-[36svh] w-full bg-accent-primary text-dark shadow transition-transform duration-300 ease-in-out sm:hidden", isOpen ? "translate-y-0" : "-translate-y-full")}>
          <div className="flex justify-between p-5">
            {/* Logo */}
            <a href="/" className="flex items-center font-title font-medium">
              <Logo />
            </a>

            {/* Close Button */}
            <button onClick={toggleMenu} aria-label="Close Menu" className="cursor-pointer">
              <img src={close} alt="Close" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center justify-center gap-y-5 text-lg">
            {navLinks.map((link) => (
              <a key={link.id} href={link.link} className="text-gray-900" onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex flex-wrap items-center justify-center gap-x-10 text-base lg:gap-x-20">
          {navLinks.map((link) => (
            <a key={link.id} href={link.link} className="hover:text-gray-90 underline-offset-8 hover:underline [&.active]:underline">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};
