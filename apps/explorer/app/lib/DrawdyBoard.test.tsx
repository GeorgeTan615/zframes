// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DRAWDY_BOARD_URL, DrawdyBoard } from "./DrawdyBoard";

afterEach(cleanup);

describe("DrawdyBoard", () => {
  it("embeds Drawdy's live view link, which other sites may frame", () => {
    const url = new URL(DRAWDY_BOARD_URL);
    expect(url.origin).toBe("https://drawdy.io");
    expect(url.pathname).toBe("/");
    expect(url.searchParams.get("canvas")).toBeTruthy();
    expect(url.searchParams.get("token")).toBeTruthy();
  });

  it("renders the live board straight away, with no click to reveal it", () => {
    const { container } = render(<DrawdyBoard />);
    expect(container.querySelector("iframe")?.getAttribute("src")).toBe(
      DRAWDY_BOARD_URL,
    );
    expect(screen.queryByRole("button")).toBeNull();
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
