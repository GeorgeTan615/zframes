// Must stay a live view link (`?canvas=…&token=…`): Drawdy's `/share/` snapshot
// links answer with frame-ancestors limited to Drawdy's own hosts, so one would
// render as a blank frame here.
export const DRAWDY_BOARD_URL =
  "https://drawdy.io/?canvas=6ad1e74248cd8385cc188964&token=IhTl_92Z03zxLfDnw46GVg";

const LINK =
  "font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white";

export function DrawdyBoard() {
  return (
    <figure className="mt-8">
      <div className="relative h-[clamp(420px,72vh,780px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14]">
        <iframe
          src={DRAWDY_BOARD_URL}
          title="zframes, from a prompt to a live market dashboard: a live Drawdy board"
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-white/60 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <span>
          Drawn on{" "}
          <a href="https://drawdy.io/" className={LINK}>
            Drawdy
          </a>
          , the whiteboard where people and AI draw together, by an AI agent
          working through its{" "}
          <a href="https://drawdy.io/mcp" className={LINK}>
            MCP server
          </a>
          .
        </span>
        <a
          href={DRAWDY_BOARD_URL}
          target="_blank"
          rel="noopener"
          className={`shrink-0 ${LINK}`}
        >
          Open in Drawdy ↗
        </a>
      </figcaption>
    </figure>
  );
}
