/**
 * Image preloading for the intro screen.
 *
 * The intro already runs for ~4.5s, which is ample time to fetch and decode the
 * imagery sitting directly behind it. Waiting on `decode()` rather than just
 * `load` means the browser holds a ready bitmap, so the first paint after the
 * curtain lifts doesn't stutter or pop in.
 */

const loadOne = (url: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    // A missing or broken asset must never hold the intro open.
    const finish = () => resolve();
    img.onerror = finish;
    img.onload = () => {
      if (typeof img.decode !== "function") return finish();
      img.decode().then(finish, finish);
    };
    img.src = url;
  });

/**
 * Resolves once every URL is fetched and decoded, or once `timeoutMs` elapses —
 * whichever lands first, so a slow connection delays the reveal but can never
 * block it.
 */
export function preloadImages(urls: string[], timeoutMs = 5000): Promise<void> {
  if (urls.length === 0) return Promise.resolve();
  return Promise.race([
    Promise.all(urls.map(loadOne)).then(() => undefined),
    new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs)),
  ]);
}

/**
 * Fetches lower-priority imagery once the browser is otherwise idle, so it is
 * cached before it's needed without competing with the first paint.
 */
export function warmInBackground(urls: string[]): void {
  const run = () => {
    for (const url of urls) void loadOne(url);
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 3000 });
  } else {
    window.setTimeout(run, 1200);
  }
}
