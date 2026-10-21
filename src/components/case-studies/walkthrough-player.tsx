import { useRef, useState } from "react";
import {
  MediaCaptionsButton,
  MediaControlBar,
  MediaController,
  MediaFullscreenButton,
  MediaMuteButton,
  MediaPlayButton,
  MediaPlaybackRateButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import walkthroughPoster from "../../assets/case-study-records/records-cover.webp";

// A self-hosted copy of the Loom recording. Loom's own player is ~28 MB of script
// before the video can start; a plain file streams and starts in a second or two.
const WALKTHROUGH_SRC = "/videos/records-walkthrough.mp4";
const WALKTHROUGH_CAPTIONS = "/videos/records-walkthrough.vtt";

/**
 * The records walkthrough's player. Its own module, loaded lazily, because media-chrome
 * is ~45 KB gzipped that every visitor would otherwise download with the first page.
 */
const WalkthroughPlayer = () => {
  // The poster and play button show at once, and nothing else loads until someone
  // presses play. The click calls play() itself, so the video starts with sound on
  // every browser, iOS included, which only allows that inside the tap.
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const start = () => {
    setStarted(true);
    const video = videoRef.current;
    if (video) {
      // Half volume, so it doesn't blare from a laptop speaker (iOS ignores this and uses
      // the device volume). 1.2x keeps five minutes of narration moving; the default rate
      // is set too, so a reload of the source can't drop it back to 1x.
      video.volume = 0.5;
      video.defaultPlaybackRate = 1.2;
      video.playbackRate = 1.2;
      video.play().catch(() => {});
    }
    // Shows up in Clarity alongside the session, so a watch can be told from a skim.
    (window as unknown as { clarity?: (...a: unknown[]) => void }).clarity?.("event", "records-walkthrough-play");
  };
  return (
    <div className="walkthrough-frame">
      {/* media-chrome's controller in place of the browser's own controls: those can't take
          extra buttons, and Chrome tucks captions into its ⋮ menu. This bar puts a CC button
          in plain view and looks the same in every browser. */}
      <MediaController className="walkthrough-player">
        <video
          slot="media"
          ref={videoRef}
          className="walkthrough-video"
          src={WALKTHROUGH_SRC}
          poster={walkthroughPoster}
          preload="none"
          playsInline
          aria-label="Records redesign walkthrough, about 5 minutes"
        >
          {/* Loom's captions, converted to WebVTT. On from the start, as on Loom and YouTube;
              the CC button turns them off. */}
          <track kind="captions" src={WALKTHROUGH_CAPTIONS} srcLang="en" label="English" default />
        </video>
        {/* Only once it's playing: before that, the poster's own play button is the control. */}
        {started ? (
          <MediaControlBar className="walkthrough-bar">
            <MediaPlayButton />
            <MediaTimeRange />
            <MediaTimeDisplay showDuration />
            <MediaCaptionsButton />
            <MediaMuteButton />
            <MediaVolumeRange />
            <MediaPlaybackRateButton rates={[1, 1.2, 1.5, 2]} />
            <MediaFullscreenButton />
          </MediaControlBar>
        ) : null}
      </MediaController>
      {started ? null : (
        <button
          type="button"
          className="walkthrough-play"
          onClick={start}
          aria-label="Play the 5-minute walkthrough"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: 0,
            border: 0,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            background: `#111111 url(${walkthroughPoster}) center / cover no-repeat`,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "grid",
              placeItems: "center",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              // Dark, so it reads over both the dark ground and the light table behind it.
              background: "rgba(17, 17, 17, 0.86)",
              boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.28)",
            }}
          >
            <svg width="22" height="24" viewBox="0 0 22 24" fill="#FFFFFF" style={{ marginLeft: "4px" }}>
              <path d="M0 0 L22 12 L0 24 Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default WalkthroughPlayer;
