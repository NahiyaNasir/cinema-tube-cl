import { describe, it, expect } from "vitest";
import { normalizeImageUrl } from "./utils";

describe("normalizeImageUrl", () => {
  it("returns null when given undefined", () => {
    expect(normalizeImageUrl(undefined)).toBe(null);
  });

  it("returns null when given an empty string", () => {
    // TODO: write this one yourself — same idea as above, different input
    expect(normalizeImageUrl("")).toBe(null);
  });

  it("returns null when given only whitespace", () => {
    // TODO: try normalizeImageUrl("   ") — what should it return?
    expect(normalizeImageUrl("   ")).toBe(null);
  });

  it("leaves an https:// URL unchanged", () => {
    expect(normalizeImageUrl("https://example.com/poster.jpg")).toBe(
      "https://example.com/poster.jpg"
    );
  });

  it("leaves a relative path starting with / unchanged", () => {
    // TODO: try "/images/poster.jpg" — read the function's code to predict the output
    expect(normalizeImageUrl("/images/poster.jpg")).toBe("/images/poster.jpg");
  });

  it("adds https:// to a bare domain with no protocol", () => {
    // TODO: try "example.com/poster.jpg" — what does the function do 
    // when the string doesn't start with http://, https://, or /?
    expect(normalizeImageUrl("example.com/poster.jpg")).toBe("https://example.com/poster.jpg");
  });
});