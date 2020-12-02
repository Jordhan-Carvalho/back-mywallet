import axios from "axios";

describe("POST /sign-up", () => {
  it("should return 409 conflict email has to be unique", async () => {
    const body = {
      name: "testing",
      email: "test@test.com",
      password: "test@123",
      confirmPassword: "test@123",
    };

    const resp = await axios.post(
      "http://localhost:3000/api/users/sign-up",
      body
    );

    expect(resp.status).toBe(409);
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

describe("POST /sign-in", () => {
  it("should sign in 200", async () => {
    const body = {
      email: "test@test.com",
      password: "test@123",
    };

    const resp = await axios.post(
      "http://localhost:3000/api/users/sign-in",
      body
    );

    expect(resp.status).toBe(200);
  });

  it("should not sign in with wrong password 401", async () => {
    const body = {
      email: "test@test.com",
      password: "123@tdf456",
    };

    try {
      await axios.post("http://localhost:3000/api/users/sign-in", body);
      fail("ERROR Logged in with wrong data");
    } catch (e) {
      expect(e.response.status).toBe(401);
    }
  });

  it("should not sign in with wrong email 401", async () => {
    const body = {
      email: "test2@te2s2t.com",
      password: "test@123",
    };

    try {
      await axios.post("http://localhost:3000/api/users/sign-in", body);
      fail("ERROR Logged in with wrong data");
    } catch (e) {
      expect(e.response.status).toBe(401);
    }
  });
});
