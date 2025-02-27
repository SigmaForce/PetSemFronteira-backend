import axios from "axios";
import { describe, expect, test } from "vitest";

describe("HTTP Request to /user/changePassword/:id", () => {
  test("should change the password when provided correctly credentials", async () => {
    const userId: string = "ac34333a-25cb-461f-90bd-32fef7e02a20";

    const result = await axios.put(
      `http://localhost:3000/user/changePassword/${userId}`,
      {
        oldPassword: "123456",
        newPassword: "548798",
      },
      {
        validateStatus: () => true,
      }
    );

    expect(result.status).toBe(200);
    expect(result.data.message).toMatch(/password changed successfully/i);
  });
});
