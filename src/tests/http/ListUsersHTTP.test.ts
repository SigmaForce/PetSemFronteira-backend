import axios from "axios";
import { describe, expect, test } from "vitest";

describe("HTTP ListUsers", () => {
  describe("User with admin role fetch /users", () => {
    test("should return a list of users", async () => {
      const result = await axios.get(`http://localhost:3000/users`);

      expect(result.status).toBe(200);
    });
  });
});
