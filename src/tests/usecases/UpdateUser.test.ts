import { describe, expect, test } from "vitest";
import AuthenticateUser from "../../application/usecase/User/AuthenticateUser";
import ChangePassword from "../../application/usecase/User/ChangePassword";
import GetUserById from "../../application/usecase/User/GetUserById";
import { UpdateUser } from "../../application/usecase/User/UpdateUser";
import { pgPromiseAdapter } from "../../infra/database/config/DatabaseConnection";
import UserRepositoryDatabase from "../../infra/database/repository/UserRepositoryDatabase";

describe("should update user if exists", () => {
  test("update user when provide a correct ID", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const updateUser = new UpdateUser(userRepository);
    const findUser = new GetUserById(userRepository);

    const input = {
      nickName: "mauricio",
      email: "mauricio@gmail.com",
      firstName: "mauricio",
      password: "548798",
      lastName: "feliz",
      birthDate: new Date("1998-11-09"),
      phone: "11556699884",
      role: "ADMIN" as "USER" | "ADMIN" | "ONG",
      status: false,
      userId: "ac34333a-25cb-461f-90bd-32fef7e02a20",
    };

    await updateUser.execute(input);

    const user = await findUser.execute({
      id: "ac34333a-25cb-461f-90bd-32fef7e02a20",
    });

    console.log(user);

    expect(user?.nickName).toMatch("mauricio");
    expect(user?.role).toBe("ADMIN");
    databaseConnection.close();
  });

  test("should return error when id is not found", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const updateUser = new UpdateUser(userRepository);

    const input = {
      nickName: "mauricio",
      email: "mauricio@gmail.com",
      firstName: "mauricio",
      password: "548798",
      lastName: "feliz",
      birthDate: new Date("1998-11-09"),
      phone: "11556699884",
      role: "ADMIN" as "USER" | "ADMIN" | "ONG",
      status: false,
      userId: "63174560-4b6c-4f87-8052-b98066b9366a",
    };
    try {
      await updateUser.execute(input);
    } catch (err: any) {
      expect(err.name).toBe("InvalidCredentialsError");
      expect(err.statusCode).toBe(401);
    }
  });

  test("password must be changed", async () => {
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const changePassword = new ChangePassword(userRepository);
    const authenticateUser = new AuthenticateUser(userRepository);
    try {
      await changePassword.execute({
        userId: "ac34333a-25cb-461f-90bd-32fef7e02a20",
        oldPassword: "548798",
        newPassword: "123456",
      });
    } catch (error) {
      console.log(error);
    }

    const result = await authenticateUser.execute({
      email: "mauricio@gmail.com",
      password: "123456",
    });

    expect(result.token).toBeDefined();
  });
});
