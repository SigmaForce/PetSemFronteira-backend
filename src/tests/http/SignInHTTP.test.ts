import axios from "axios";
import { describe, expect, test } from "vitest";

describe("HTTP userSignIn", () => {
  describe("User fetch /user/signIn", () => {
    test("should return token when fetch with correct credentials ", async () => {
      const input = {
        email: "leonardolucas@example.com",
        password: "548798",
      };

      const result = await axios.post(
        `http://localhost:3000/user/signIn`,
        input,
        {
          validateStatus: () => true,
        }
      );

      expect(result.status).toBe(200);
      expect(result.data.token).toBeDefined();
    });

    test("should return invalidCredentials when fetch with invalid user", async () => {
      const input = {
        email: "email@example.com",
        password: "123456",
      };

      const result = await axios.post(
        `http://localhost:3000/user/signIn`,
        input,
        {
          validateStatus: () => true,
        }
      );

      expect(result.status).toBe(401);
      expect(result.data.token).not.toBeDefined();
      expect(result.data.message).toMatch(/crendenciais invalidas/i);
      expect(result.data.name).toBe("InvalidCredentialsError");
    });

    test("should return badRequestError when no body is provided", async () => {
      const result = await axios.post(
        `http://localhost:3000/user/signIn`,
        {
          email: "user@example.com",
        },
        {
          validateStatus: () => true,
        }
      );

      expect(result.data.status).toBe(400);
      expect(result.data.message).toMatch(/requisição inválida/i);
      expect(result.data.name).toBe("BadRequestError");
    });
  });
});
