import axios from "axios";
import { describe, expect, test } from "vitest";

describe("User HTTP", () => {
  const userIds: string[] = [];

  test("should create user when request in /user", async () => {
    const input = {
      nickName: "johndoe",
      email: "John@example.com",
      firstName: "John",
      lastName: "Doe",
      birthDate: "1998-11-09",
      password: "123456",
      phone: "11556699884",
      role: "USER",
      status: false,
    };

    const responseUser = await axios.post("http://localhost:3000/user", input);
    const outputCheckout = responseUser.data;

    expect(outputCheckout.userId).toBeDefined();
    userIds.push(outputCheckout.userId);

    try {
      const fetchUser = await axios.post("http://localhost:3000/user", input);
    } catch (err: any) {
      expect(err.status).toBe(400);
    }
  });

  test("should return user when requests /user/:id", async () => {
    const user = await axios.get(`http://localhost:3000/user/${userIds[0]}`);

    expect(user.data).toMatchObject({
      userId: userIds[0],
      nickName: "johndoe",
      email: "John@example.com",
      firstName: "John",
      lastName: "Doe",
      birthDate: "1998-11-08T03:00:00.000Z",
      password: "123456",
      phone: "11556699884",
      role: "USER",
      status: false,
      description: null,
      image_url: null,
    });
  });

  test("should delete user when request in /user/:id", async () => {
    const userResponse = await axios.get(
      `http://localhost:3000/user/${userIds[0]}`
    );

    expect(userResponse.status).toBe(200);
    expect(userResponse.data).toBeDefined();

    const user = await axios.delete(`http://localhost:3000/user/${userIds[0]}`);
    expect(user.status).toBe(204);

    const fetchUser = await axios.get(
      `http://localhost:3000/user/${userIds[0]}`
    );

    expect(fetchUser.status).toBe(204);
  });
});
