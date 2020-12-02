import supertest from "supertest";

import { app } from "../app";
import db from "../database/index";

afterAll(async () => {
  await db.end();
});

describe("POST /sign-up", () => {
  it("should return 409 when user already registered", async () => {
    const validUser = {
      name: "testing",
      email: "test@test.com",
      password: "test@123",
      confirmPassword: "test@123",
    };

    const resp = await supertest(app)
      .post("/api/users/sign-up")
      .send(validUser);

    expect(resp.status).toBe(409);
  });

  it("should return 422 when trying to register with missing data", async () => {
    const invalidUser = {
      name: "testing",
      email: "test@test.com",
      password: "123456",
    };

    const resp = await supertest(app)
      .post("/api/users/sign-up")
      .send(invalidUser);

    expect(resp.status).toBe(422);
  });
});

describe("POST /sign-in", () => {
  it("should return 200 when succesfuly log in", async () => {
    const validUser = {
      email: "test@test.com",
      password: "test@123",
    };

    const resp = await supertest(app)
      .post("/api/users/sign-in")
      .send(validUser);

    expect(resp.status).toBe(200);
  });

  it("should return 401 whenign in with wrong password/email", async () => {
    const invalidUser = {
      email: "test@test.com",
      password: "123@tdf456",
    };

    const resp = await supertest(app)
      .post("/api/users/sign-in")
      .send(invalidUser);

    expect(resp.status).toBe(401);
  });
});
