// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DRAWDY_BOARD_URL, DrawdyBoard } from "./DrawdyBoard";

vi.mock("next/image", () => ({
  default: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} />
  ),
}));

afterEach(cleanup);

const figure = (container: HTMLElement) =>
  container.querySelector("figure[data-board-state]");

describe("DrawdyBoard", () => {
  it("embeds Drawdy's live view link, which other sites may frame", () => {
    const url = new URL(DRAWDY_BOARD_URL);
    expect(url.origin).toBe("https://drawdy.io");
    expect(url.pathname).toBe("/");
    expect(url.searchParams.get("canvas")).toBeTruthy();
    expect(url.searchParams.get("token")).toBeTruthy();
  });

  it("loads the Drawdy app only after the reader asks for it", () => {
    const { container } = render(<DrawdyBoard />);
    expect(figure(container)?.getAttribute("data-board-state")).toBe("poster");
    expect(container.querySelector("iframe")).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: "Explore the live board" }),
    );

    expect(figure(container)?.getAttribute("data-board-state")).toBe("live");
    expect(container.querySelector("iframe")?.getAttribute("src")).toBe(
      DRAWDY_BOARD_URL,
    );
  });

  it("links drawdy.io with followed links", () => {
    render(<DrawdyBoard />);
    for (const [name, href] of [
      ["Drawdy", "https://drawdy.io/"],
      ["MCP server", "https://drawdy.io/mcp"],
    ]) {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href")).toBe(href);
      expect(link.getAttribute("rel") ?? "").not.toMatch(
        /nofollow|ugc|sponsored/,
      );
    }
  });
});
