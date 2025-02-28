import { describe, expect, test } from "vitest";
import ListUsers from "../../application/usecase/User/ListUsers";
import { pgPromiseAdapter } from "../../infra/database/config/DatabaseConnection";
import UserRepositoryDatabase from "../../infra/database/repository/UserRepositoryDatabase";

describe("UseCase ListUsers", () => {
  test("should list all users available", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const listUsers = new ListUsers(userRepository);
    const users = await listUsers.execute();
    if (users) expect(users[0].userId).toBeDefined();
  });
});
