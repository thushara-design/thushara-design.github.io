import { useEffect, useState } from "react";
import { socialLinks } from "../data";
import { Button } from "./ui/button";

const EMAIL = socialLinks.find((link) => link.label === "Email")?.link;

export const Contact = () => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  if (!EMAIL) return null;
  return (
    <section id="contact" className="space-y-6">
      <h4 className="text-2xl font-bold text-dark">Let&apos;s talk</h4>
      <p className="text-dark">
        {/* I&apos;m always open to new projects, collaborations, or employment
        opportunities. Let&apos;s connect! */}
        I&apos;d love to hear from you! Whether you&apos;re looking for a UX
        designer to collaborate with, have questions about my work, or just want
        to chat about design, feel free to reach out.
      </p>
      <div className="flex items-center gap-4">
        <a href={EMAIL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">{EMAIL.split(":")[1]}</Button>
        </a>
        {/* clipboard */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(EMAIL.split(":")[1]);
            setIsCopied(true);
          }}
        >
          {isCopied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-dark"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="m9 14 2 2 4-4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-dark"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              <path d="M16 4h2a2 2 0 0 1 2 2v4" />
              <path d="M21 14H11" />
              <path d="m15 10-4 4 4 4" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
};
