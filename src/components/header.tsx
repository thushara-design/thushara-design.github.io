import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data";
import { close, Logo, Menu } from "../assets/images";
import { cn } from "../lib/utils";

export const Header = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track menu open/close
  const navMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle the state
  };

  useEffect(() => {
    const navMenu = navMenuRef.current;

    const handleOutsideClick = (event: MouseEvent) => {
      if (navMenu && !navMenu.contains(event.target as Node)) {
        setIsOpen(false); // Close the menu if clicking outside
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick); // Add listener when menu is open
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick); // Cleanup listener
    };
  }, [isOpen]);

  return (
    <header className={cn("bg-transparent/30 backdrop-blur-lg fixed top-0 left-0 w-full z-40", className)}>
      <div className="flex items-center justify-between p-5">
        {/* Logo */}
        <a href="/#" className="flex items-center font-title font-medium">
          <Logo className="size-10" />
        </a>

        {/* Navigation menu button */}
        <div
          ref={navMenuRef}
          onClick={toggleMenu} // Toggle menu on click
          className="flex cursor-pointer flex-col items-center justify-center gap-1 md:hidden" // Only show on mobile
          aria-label="Navigation Menu"
          aria-expanded={isOpen} // Accessibility attribute
        >
          <Menu aria-hidden={isOpen} aria-label="Open Menu" />
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn("fixed z-50 top-0 left-0 w-full bg-accent-primary text-dark shadow transition-transform duration-300 ease-in-out md:hidden", isOpen ? "translate-y-0" : "-translate-y-full")}
          style={{ height: "30vh" }} // Half screen height
        >
          <div className="flex justify-between p-5">
            {/* Logo */}
            <a href="/#" className="flex items-center font-title font-medium">
              <Logo className="size-10" />
            </a>

            {/* Close button */}
            <button onClick={toggleMenu} className="cursor-pointer">
              <img src={close} alt="Close" aria-label="Close Menu" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-y-5 text-lg">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.link}
                className="text-gray-900"
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          className={`hidden flex-wrap items-center justify-center gap-x-10 text-base md:ml-auto md:flex lg:gap-x-20`} // Show on desktop only
        >
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
