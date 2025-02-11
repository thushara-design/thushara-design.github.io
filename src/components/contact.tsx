import { useEffect, useState } from "react";
import { socialLinks } from "../data";
import { Button } from "./ui/button";

const EMAIL = socialLinks.find((link) => link.label === "Email")?.link;

export const Contact = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  if (!EMAIL) return null;

  const emailText = EMAIL.split(":")[1];

  const handleCopy = () => {
    navigator.clipboard.writeText(emailText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };
  return (
    <section id="contact" className="space-y-6">
      <h4 className="text-2xl font-bold text-dark">Let&apos;s talk</h4>
      <p className="text-dark">
        {/* I&apos;m always open to new projects, collaborations, or employment
        opportunities. Let&apos;s connect! */}
        I&apos;d love to hear from you! Whether you&apos;re looking for a UX designer to collaborate with, have questions about my work, or just want to chat about design, feel free to reach out.
      </p>
      <Button
        variant="outline"
        onClick={handleCopy}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsCopied(false);
        }}
        className="w-72 border border-border transition-all duration-300 ease-in-out">
        <span className="transition-opacity duration-300">{isCopied ? "Copied!" : isHovered ? "Copy" : emailText}</span>
      </Button>
    </section>
  );
};
