import axios from "axios";
import { describe, expect, test } from "vitest";

describe("HTTP Request to /user/:id", () => {
  test("should update user", async () => {
    const input = {
      nickName: "Joao",
      email: "mauricio@gmail.com",
      firstName: "mauricio",
      password: "548798",
      lastName: "feliz",
      birthDate: new Date("1998-11-09"),
      phone: "11556699884",
      role: "ADMIN" as "USER" | "ADMIN" | "ONG",
      status: false,
    };

    const userId = "ac34333a-25cb-461f-90bd-32fef7e02a20";

    const result = await axios.put(
      `http://localhost:3000/user/${userId}`,
      input,
      {
        validateStatus: () => true,
      }
    );

    expect(result.status).toBe(204);
  });
});
