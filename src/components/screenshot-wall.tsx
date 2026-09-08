import { useTheme } from "../lib/theme";

/**
 * Auto-scrolling product-screenshot wall, 3 rows, alternating direction,
 * seamless infinite loop, theme-aware.
 *
 * Screenshots load automatically from:
 *   src/assets/product-screenshots/light/   (shown on the light theme)
 *   src/assets/product-screenshots/dark/    (shown on the dark theme)
 * Drop PNG/JPG/WebP files (any name) into either folder; they split evenly
 * across the three rows in filename order.
 */
const darkModules = import.meta.glob(
  "../assets/product-screenshots/dark/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);
const lightModules = import.meta.glob(
  "../assets/product-screenshots/light/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
);

const toImages = (mods: Record<string, unknown>) =>
  Object.keys(mods)
    .sort()
    .map((key) => mods[key] as string);

const darkImages = toImages(darkModules);
const lightImages = toImages(lightModules);

/**
 * Both themes' screenshots. Warmed in the background once the intro is done, so
 * opening a case study — or flipping the theme — doesn't wait on the network.
 */
export const screenshotImages = [...darkImages, ...lightImages];

const directions = ["ltr", "rtl", "ltr"] as const;

const splitRows = (images: string[]) => {
  const perRow = Math.max(1, Math.ceil(images.length / 3));
  return [
    images.slice(0, perRow),
    images.slice(perRow, perRow * 2),
    images.slice(perRow * 2),
  ].filter((r) => r.length > 0);
};

// Repeat each row so it always fills the widest viewports; the CSS animates
// by -50% for a seamless loop.
const fill = (items: string[]) => [...items, ...items, ...items, ...items];

export const ScreenshotWall = () => {
  const { theme } = useTheme();
  // Show the opposite-mode screenshots so the cards always contrast with the
  // page background: dark shots on the light theme, light shots on the dark.
  const images =
    theme === "dark"
      ? lightImages.length > 0
        ? lightImages
        : darkImages
      : darkImages.length > 0
        ? darkImages
        : lightImages;

  if (images.length === 0) return null;
  const rows = splitRows(images);

  return (
    <div className="shot-wall" aria-hidden="true">
      {rows.map((items, r) => (
        <div
          key={r}
          className={`shot-row shot-row--${directions[r % directions.length]}`}
        >
          <div className="shot-track">
            {fill(items).map((src, i) => (
              <div key={i} className="shot-card">
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
