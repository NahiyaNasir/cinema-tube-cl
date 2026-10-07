import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { verifyToken, decodeToken } from "./jwtUtils";

const SECRET = "test-secret";

describe("verifyToken", () => {
  it("returns success with the decoded payload for a valid token", () => {
    const token = jwt.sign({ userId: "123" }, SECRET);
    const result = verifyToken(token, SECRET);
    expect(result.success).toBe(true);
    // TODO: also check that result.data.userId equals "123"
    
  });

  it("returns success:false when verified with the wrong secret", () => {
    const token = jwt.sign({ userId: "123" }, SECRET);
    // TODO: call verifyToken(token, "wrong-secret") and check result.success is false
  });

  it("returns success:false for a garbage/malformed token", () => {
    // TODO: call verifyToken("not-a-real-token", SECRET) and check result.success
  });
});

describe("decodeToken", () => {
  it("decodes a valid token's payload without checking the secret", () => {
    const token = jwt.sign({ userId: "123" }, SECRET);
    const result = decodeToken(token);
    // TODO: check result.success is true and result.data.userId equals "123"
    expect(result.success).toBe(true)

  });

  it("what happens with a garbage token?", () => {
    // TODO: call decodeToken("not-a-real-token") and log or check the result.
    // Prediction question: will result.success be true or false here?
    // Think about it BEFORE running — decode() doesn't check a signature like verify() does.
  });
});