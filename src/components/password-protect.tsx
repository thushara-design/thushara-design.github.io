import React, { useCallback, useState, type ReactNode } from "react";
import { ArrowRight } from "iconoir-react";
import { Logo } from "../assets/images";
import { IntroSequence } from "./intro-sequence";
import { sha256Hex } from "../lib/sha256";

// The SHA-256 hash of "design2026"
const VALID_HASH = "020c355824f43c23a61f7fbeb5fde1acdfdf447747b52c670bfd965be7cd9a52";

async function hashPassword(password: string): Promise<string> {
  // `crypto.subtle` exists only in a secure context. localhost qualifies, but
  // a LAN address over plain HTTP (testing on a phone against the dev server)
  // does not — there it is undefined, so this threw and every password was
  // rejected as incorrect. Fall back to a local digest in that case.
  if (!globalThis.crypto?.subtle) return sha256Hex(password);

  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface PasswordProtectProps {
  onUnlock: () => void;
}

export const PasswordProtect: React.FC<PasswordProtectProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(false);

    try {
      const hash = await hashPassword(password);
      if (hash === VALID_HASH) {
        onUnlock();
      } else {
        setError(true);
        setPassword("");
      }
    } catch (err) {
      console.error("Hashing failed", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="load-screen !z-40">
      <header className="load-head">
        <Logo className="load-logo !opacity-100 !animate-none" aria-hidden="true" />
        <span className="load-eyebrow !opacity-100 !animate-none">SECURED</span>
      </header>

      <div className="load-center">
        <div className="mb-10 max-w-2xl">
          <h1 className="mb-4 font-heading text-4xl font-medium tracking-tight !opacity-100 !animate-none text-[#F5F4EF]">Protected Work</h1>
          <p className="text-[#a3a3a3] text-lg !opacity-100 !animate-none">
            Please enter the password to view this portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            className={`w-full border-b bg-transparent pb-3 pr-10 text-lg outline-none transition-colors placeholder:text-[#a3a3a3]/50 ${
              error ? "border-red-500 text-red-500" : "border-[#333] text-[#F5F4EF] focus:border-[#F5F4EF]"
            }`}
            autoFocus
          />
          <button
            type="submit"
            disabled={loading || !password}
            className={`absolute right-0 top-0 p-1 text-[#a3a3a3] transition-colors hover:text-[#F5F4EF] disabled:opacity-50 ${
              error ? "text-red-500 hover:text-red-400" : ""
            }`}
            aria-label="Submit password"
          >
            <ArrowRight strokeWidth={2} />
          </button>
          
          {error && (
            <p className="absolute -bottom-8 left-0 text-sm font-mono tracking-widest uppercase text-red-500 animate-fade-in">
              Incorrect password
            </p>
          )}
        </form>
      </div>

      <div className="load-foot">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[#8A867C] uppercase">
          Need access?{" "}
          <a
            href="mailto:thusharavarghese9@gmail.com"
            className="text-[#F5F4EF] underline underline-offset-4 transition-colors hover:text-[#E5533D]"
          >
            Email me
          </a>
        </span>
      </div>
    </div>
  );
};

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const [isLocked, setIsLocked] = useState(
    () => !sessionStorage.getItem("unlocked"),
  );
  const [showIntro, setShowIntro] = useState(isLocked);

  const handleIntroDone = useCallback(() => setShowIntro(false), []);

  const handleUnlock = useCallback(() => {
    sessionStorage.setItem("unlocked", "true");
    setIsLocked(false);
  }, []);

  if (isLocked) {
    return (
      <div className="relative min-h-screen font-sans text-dark">
        {showIntro ? <IntroSequence onDone={handleIntroDone} /> : null}
        <PasswordProtect onUnlock={handleUnlock} />
      </div>
    );
  }

  return children;
};
