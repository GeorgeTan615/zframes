"use client";

import Image from "next/image";
import { useState } from "react";

// Must stay a live view link (`?canvas=…&token=…`): Drawdy's `/share/` snapshot
// links answer with frame-ancestors limited to Drawdy's own hosts, so one would
// render as a blank frame here.
export const DRAWDY_BOARD_URL =
  "https://drawdy.io/?canvas=6ad1e74248cd8385cc188964&token=IhTl_92Z03zxLfDnw46GVg";

const LINK =
  "font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white";

export function DrawdyBoard() {
  const [live, setLive] = useState(false);

  return (
    <figure data-board-state={live ? "live" : "poster"} className="mt-8">
      <div
        className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b14] ${
          live ? "h-[clamp(420px,72vh,780px)]" : "aspect-[1440/795]"
        }`}
      >
        {live ? (
          <iframe
            src={DRAWDY_BOARD_URL}
            title="zframes, from a prompt to a live market dashboard: a live Drawdy board"
            allow="fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLive(true)}
            aria-label="Explore the live board"
            className="group absolute inset-0 cursor-pointer"
          >
            <Image
              src="/drawdy/zframes-prompt-to-dashboard.webp"
              alt="A Drawdy whiteboard of a zframes Stocks & Crypto Desk: TSLA hourly candles, a price ticker, the VIX at 16.87, the Treasury yield curve, crypto fear and greed at 63, top movers, a market cap treemap, a coin momentum heatmap and TSLA, NVDA and BTC compared over a month."
              fill
              sizes="(min-width: 1280px) 1232px, 100vw"
              className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.015]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="glow-brand absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg">
              Explore the live board
            </span>
          </button>
        )}
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
