import { describe, expect, test } from "vitest";
import CreateUser from "../../application/usecase/User/CreateUser";
import DeleteUser from "../../application/usecase/User/DeleteUser";
import GetUserByEmail from "../../application/usecase/User/GetUserByEmail";
import GetUserById from "../../application/usecase/User/GetUserById";
import User from "../../domain/entities/User";
import { pgPromiseAdapter } from "../../infra/database/config/DatabaseConnection";
import UserRepositoryDatabase from "../../infra/database/repository/UserRepositoryDatabase";

describe("UserRepositoryDatabase", () => {
  const userIds: string[] = [];
  test("should create a new User", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const createUser = new CreateUser(userRepository);

    const input: User = {
      nickName: "johndoe",
      email: "John.Doe@example.com",
      firstName: "John",
      lastName: "Doe",
      birthDate: new Date(),
      password: "123456",
      phone: "11556699884",
      role: "USER",
      status: false,
    };

    const userId = await createUser.execute(input);
    expect(userId?.message).toBe("User created");
    userIds.push(userId?.userId!);
    try {
      const user = await createUser.execute(input);
    } catch (err: any) {
      expect(err.statusCode).toBe(400);
    }
    databaseConnection.close();
  });

  test("shoud return user by id", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const findByID = new GetUserById(userRepository);

    const user = await findByID.execute({
      id: userIds[0],
    });

    expect(user).toBeDefined();
    databaseConnection.close();
  });

  test("should return user by email", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const findByEmail = new GetUserByEmail(userRepository);

    const userId = await findByEmail.execute({ email: "John.Doe@example.com" });
    expect(userId).toBeDefined();
    databaseConnection.close();
  });

  test("should delete user", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const deleteUser = new DeleteUser(userRepository);
    const findByEmail = new GetUserByEmail(userRepository);

    const user = await findByEmail.execute({ email: "John.Doe@example.com" });
    expect(user).toBeDefined();
    await deleteUser.execute(userIds[0]);
    const userId = await findByEmail.execute({ email: "John.Doe@example.com" });
    expect(userId).toBeUndefined();
    databaseConnection.close();
  });
});
