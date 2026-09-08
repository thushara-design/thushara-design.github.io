import React, { useCallback, useState, type ReactNode } from "react";
import { ArrowRight, Eye, EyeClosed, Lock } from "iconoir-react";
import { Logo } from "../assets/images";
import { IntroSequence } from "./intro-sequence";
import { consumeToken, readGrant, verify, verifySync, writeGrant } from "../lib/access";

interface PasswordProtectProps {
  onUnlock: () => void;
}

export const PasswordProtect: React.FC<PasswordProtectProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(false);

    try {
      const match = await verify(password);
      if (match) {
        writeGrant(match.label);
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
      </header>

      <div className="load-center">
        <div className="mb-8 max-w-md">
          <Lock
            className="mb-4 text-[#8A867C] !opacity-100 !animate-none"
            width={21}
            height={21}
            strokeWidth={1.2}
            aria-hidden="true"
          />
          <h1 className="mb-2 font-heading text-xl font-medium tracking-tight !opacity-100 !animate-none text-[#F5F4EF]">Protected work</h1>
          <p className="text-sm text-[#a3a3a3] !opacity-100 !animate-none">
            Enter the password to view this portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative w-full max-w-sm">
          <input
            type={revealed ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            /* Right padding clears both the reveal toggle and the submit arrow. */
            className={`w-full border-b bg-transparent pb-2 pr-[76px] text-base outline-none transition-colors placeholder:text-[#a3a3a3]/50 ${
              error ? "border-red-500 text-red-500" : "border-[#333] text-[#F5F4EF] focus:border-[#F5F4EF]"
            }`}
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            /* `justify-end` rather than centring: it puts the icon's right edge
               on the button's, so the arrow lands flush with the end of the
               underline instead of floating 15px inside it. 36px wide keeps the
               pair from overlapping while staying a 44px-tall tap target. */
            className="absolute right-9 top-0 -mt-2 flex h-11 w-9 items-center justify-end text-[#8A867C] transition-colors hover:text-[#F5F4EF]"
            aria-label={revealed ? "Hide password" : "Show password"}
            aria-pressed={revealed}
            title={revealed ? "Hide password" : "Show password"}
          >
            {revealed
              ? <EyeClosed width={17} height={17} strokeWidth={1.2} />
              : <Eye width={17} height={17} strokeWidth={1.2} />}
          </button>
          <button
            type="submit"
            disabled={loading || !password}
            className={`absolute right-0 top-0 -mt-2 flex h-11 w-9 items-center justify-end text-[#8A867C] transition-colors hover:text-[#F5F4EF] disabled:opacity-50 ${
              error ? "text-red-500 hover:text-red-400" : ""
            }`}
            aria-label="Submit password"
          >
            <ArrowRight width={17} height={17} strokeWidth={1.2} />
          </button>
          
          {error && (
            <p className="absolute -bottom-8 left-0 font-mono text-[11px] tracking-[0.14em] uppercase text-red-500 animate-fade-in">
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

/** How this visit opens: at the gate, straight into the work, or via the intro. */
type Entry = { locked: boolean; intro: boolean };

/**
 * Resolved once, before first paint, so a valid share link never flashes the
 * gate. It must not run twice: `consumeToken` strips `?k=` from the address
 * bar, so a second call would find nothing. It runs even for someone already
 * unlocked, so a re-opened share link still tidies its own URL.
 */
function resolveEntry(): Entry {
  const token = consumeToken();
  if (readGrant()) return { locked: false, intro: false };
  if (!token) return { locked: true, intro: true };

  const match = verifySync(token);
  if (!match) return { locked: true, intro: true };

  writeGrant(match.label);
  return { locked: false, intro: match.intro };
}

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const [entry] = useState(resolveEntry);
  const [isLocked, setIsLocked] = useState(entry.locked);
  const [showIntro, setShowIntro] = useState(entry.intro);

  const handleIntroDone = useCallback(() => setShowIntro(false), []);

  const handleUnlock = useCallback(() => setIsLocked(false), []);

  if (isLocked) {
    return (
      <div className="relative min-h-screen font-sans text-dark">
        {showIntro ? <IntroSequence onDone={handleIntroDone} /> : null}
        <PasswordProtect onUnlock={handleUnlock} />
      </div>
    );
  }

  // The intro is a fixed overlay that lifts away, so the work renders behind it
  // and is already painted the moment it clears.
  return (
    <>
      {showIntro ? <IntroSequence onDone={handleIntroDone} /> : null}
      {children}
    </>
  );
};
