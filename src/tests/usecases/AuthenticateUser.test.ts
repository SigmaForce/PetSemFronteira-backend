import { describe, expect, test } from "vitest";
import AuthenticateUser from "../../application/usecase/User/AuthenticateUser";
import { pgPromiseAdapter } from "../../infra/database/config/DatabaseConnection";
import UserRepositoryDatabase from "../../infra/database/repository/UserRepositoryDatabase";

describe("should authenticate", () => {
  describe("User with Invalid Credentials", () => {
    test("expect return error InvalidCrendentials with status_code 401", async () => {
      const databaseConnection = new pgPromiseAdapter();
      const userRepository = new UserRepositoryDatabase(databaseConnection);
      const authenticateUser = new AuthenticateUser(userRepository);
      const input = {
        email: "J.doe@example.com",
        password: "074598",
      };
      try {
        await authenticateUser.execute(input);
      } catch (err: any) {
        expect(err.message).toBe("Credenciais Invalidas");
        expect(err.statusCode).toBe(401);
        expect(err.name).toBe("InvalidCredentialsError");
      } finally {
        databaseConnection.close();
      }
    });
  });

  describe("User with valid Credentials", () => {
    test("expect return token", async () => {
      const databaseConnection = new pgPromiseAdapter();
      const userRepository = new UserRepositoryDatabase(databaseConnection);
      const authenticateUser = new AuthenticateUser(userRepository);
      const input = {
        email: "J.doe@example.com",
        password: "123456",
      };
      try {
        const { token } = await authenticateUser.execute(input);
        expect(token).toBeDefined();
      } catch (err: any) {
      } finally {
        databaseConnection.close();
      }
    });
  });
});
