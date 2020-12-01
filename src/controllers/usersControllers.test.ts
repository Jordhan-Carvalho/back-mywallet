import axios from "axios";

describe("POST /sign-up", () => {
  it("should return 201 Created", async () => {
    const body = {
      name: "testing",
      email: "test@test.com",
      password: "123456",
      confirmPassword: "123456",
    };

    const resp = await axios.post(
      "http://localhost:3000/api/users/sign-up",
      body
    );

    expect(resp.status).toBe(201);
  });

  it("should return 422 Unprocessable Entity", async () => {
    const body = {
      name: "testing",
      email: "test@test.com",
      password: "123456",
    };

    try {
      await axios.post("http://localhost:3000/api/users/sign-up", body);
      fail("ERROR Created user with missing data");
    } catch (e) {
      expect(e.response.status).toBe(422);
    }
  });
});
